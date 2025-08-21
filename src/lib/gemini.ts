import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyAlH6fGlkav2uGJckN3diEO1HGAhzztYME');

export interface ConceptNode {
  id: string;
  name: string;
  type: 'concept' | 'topic' | 'subtopic';
  importance: number;
}

export interface ConceptRelation {
  source: string;
  target: string;
  relationship: string;
  strength: number;
}

export interface KnowledgeGraphData {
  nodes: ConceptNode[];
  relationships: ConceptRelation[];
}

export async function generateKnowledgeGraph(text: string): Promise<KnowledgeGraphData> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
    Analyze the following text and extract a knowledge graph with concepts and their relationships.
    
    Return ONLY a valid JSON object with this exact structure:
    {
      "nodes": [
        {
          "id": "unique_id",
          "name": "concept name",
          "type": "concept" | "topic" | "subtopic",
          "importance": 1-10
        }
      ],
      "relationships": [
        {
          "source": "node_id",
          "target": "node_id", 
          "relationship": "describes relationship",
          "strength": 1-5
        }
      ]
    }
    
    Guidelines:
    - Extract 10-20 key concepts maximum
    - Use clear, concise concept names
    - Classify concepts as "concept" (main ideas), "topic" (broad areas), or "subtopic" (specific details)
    - Create meaningful relationships between concepts
    - Importance: 10 = most important, 1 = least important
    - Strength: 5 = very strong relationship, 1 = weak relationship
    - Ensure all relationship source/target IDs exist in nodes
    
    Text to analyze:
    ${text}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text_response = response.text();
    
    // Clean the response to ensure it's valid JSON
    const jsonStart = text_response.indexOf('{');
    const jsonEnd = text_response.lastIndexOf('}') + 1;
    const jsonString = text_response.slice(jsonStart, jsonEnd);
    
    const data = JSON.parse(jsonString);
    
    // Validate and clean the data
    if (!data.nodes || !data.relationships) {
      throw new Error('Invalid response format from AI');
    }
    
    // Ensure all relationships reference valid nodes
    const nodeIds = new Set(data.nodes.map((n: ConceptNode) => n.id));
    const validRelationships = data.relationships.filter((r: ConceptRelation) => 
      nodeIds.has(r.source) && nodeIds.has(r.target)
    );
    
    return {
      nodes: data.nodes,
      relationships: validRelationships
    };
    
  } catch (error) {
    console.error('Error generating knowledge graph:', error);
    throw new Error('Failed to generate knowledge graph. Please try again.');
  }
}

export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.type === 'application/pdf') {
      // For PDF files, we'll use a simple text extraction
      // In a real app, you'd use a proper PDF parsing library
      const reader = new FileReader();
      reader.onload = () => {
        // This is a simplified approach - in production use pdf-parse or similar
        resolve(reader.result as string || '');
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsText(file);
    } else {
      // For text files
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string || '');
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    }
  });
}