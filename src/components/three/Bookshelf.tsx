import { useMemo } from 'react';
import * as THREE from 'three';

interface BookshelfProps {
  position?: [number, number, number];
}

// Book colors - tech and creative themed
const BOOK_COLORS = [
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#f59e0b', // Amber
  '#22c55e', // Green
  '#06b6d4', // Cyan
  '#ef4444', // Red
  '#1e293b', // Dark slate
  '#f8fafc', // White
];

interface BookProps {
  position: [number, number, number];
  height: number;
  width: number;
  color: string;
}

function Book({ position, height, width, color }: BookProps) {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.8,
        metalness: 0,
      }),
    [color]
  );

  return (
    <mesh position={position} material={material} castShadow>
      <boxGeometry args={[width, height, 0.12]} />
    </mesh>
  );
}

export function Bookshelf({ position = [0, 0, 0] }: BookshelfProps) {
  const shelfMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4a3728',
        roughness: 0.7,
        metalness: 0.1,
      }),
    []
  );

  // Generate random books
  const books = useMemo(() => {
    const generatedBooks: Array<{
      position: [number, number, number];
      height: number;
      width: number;
      color: string;
    }> = [];

    // Bottom shelf books
    let xPos = -0.35;
    for (let i = 0; i < 6; i++) {
      const height = 0.15 + Math.random() * 0.08;
      const width = 0.03 + Math.random() * 0.02;
      generatedBooks.push({
        position: [xPos + width / 2, height / 2 + 0.02, 0],
        height,
        width,
        color: BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)],
      });
      xPos += width + 0.01;
    }

    // Top shelf books
    xPos = -0.3;
    for (let i = 0; i < 5; i++) {
      const height = 0.12 + Math.random() * 0.06;
      const width = 0.025 + Math.random() * 0.02;
      generatedBooks.push({
        position: [xPos + width / 2, 0.35 + height / 2 + 0.02, 0],
        height,
        width,
        color: BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)],
      });
      xPos += width + 0.015;
    }

    return generatedBooks;
  }, []);

  return (
    <group position={position}>
      {/* Back panel */}
      <mesh position={[0, 0.35, -0.08]} material={shelfMaterial}>
        <boxGeometry args={[0.9, 0.7, 0.02]} />
      </mesh>

      {/* Bottom shelf */}
      <mesh position={[0, 0.02, 0]} material={shelfMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.02, 0.18]} />
      </mesh>

      {/* Middle shelf */}
      <mesh position={[0, 0.35, 0]} material={shelfMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.02, 0.18]} />
      </mesh>

      {/* Top shelf */}
      <mesh position={[0, 0.68, 0]} material={shelfMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.02, 0.18]} />
      </mesh>

      {/* Side panels */}
      <mesh position={[-0.44, 0.35, 0]} material={shelfMaterial} castShadow>
        <boxGeometry args={[0.02, 0.68, 0.18]} />
      </mesh>
      <mesh position={[0.44, 0.35, 0]} material={shelfMaterial} castShadow>
        <boxGeometry args={[0.02, 0.68, 0.18]} />
      </mesh>

      {/* Books */}
      {books.map((book, index) => (
        <Book key={index} {...book} />
      ))}
    </group>
  );
}
