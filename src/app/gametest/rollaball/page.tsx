"use client";
import React, { useRef, useState, useEffect, createContext, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, usePlane, useSphere, useBox } from '@react-three/cannon';
import { OrbitControls, Text, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

const KeysPressedContext = createContext<{ keysPressed: Record<string, boolean>, gameOver: boolean }>({ keysPressed: {}, gameOver: false });

const Ball = ({ position, onPositionChange, onCollision }: { position: [number, number, number], onPositionChange: (position: [number, number, number]) => void, onCollision: () => void }) => {
    const [ref, api] = useSphere(() => ({ mass: 1, position, args: [0.3], onCollide: onCollision, restitution: 0.8 }));
    const velocity = useRef([0, 0, 0]);
    const { keysPressed, gameOver } = useContext(KeysPressedContext);

    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    useFrame(() => {
        if (gameOver) return;

        const force = 7;
        const forceVector = [0, 0, 0];

        if (keysPressed['ArrowUp'] || keysPressed['KeyW']) forceVector[2] -= force;
        if (keysPressed['ArrowDown'] || keysPressed['KeyS']) forceVector[2] += force;
        if (keysPressed['ArrowLeft'] || keysPressed['KeyA']) forceVector[0] -= force;
        if (keysPressed['ArrowRight'] || keysPressed['KeyD']) forceVector[0] += force;

        api.applyForce(forceVector as [number, number, number], [0, 0, 0]);

        api.position.subscribe((p) => {
            onPositionChange([p[0], p[1], p[2]]);
        });
    });

    return (
        <mesh ref={ref as React.RefObject<THREE.Mesh>} name="ball" castShadow>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial metalness={0.8} roughness={0.2} color="blue" />
        </mesh>
    );
};

const Plane = (props: any) => {
    const [ref, api] = useBox(() => ({ 
        args: [10, 2, 10],
        position: [0, -1, 0],
        ...props 
    }));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        api.rotation.set(
            Math.sin(time * 0.5) * 0.2,
            0,
            Math.cos(time * 0.5) * 0.2
        );
    });

    const texture = useTexture('/floor_texture.jpg');

    return (
        <mesh ref={ref as React.RefObject<THREE.Mesh>} receiveShadow>
            <boxGeometry args={[10, 2, 10]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

const Coin = ({ position, isCollected, onCollect }: { position: [number, number, number], isCollected: boolean, onCollect: () => void }) => {
    const [ref, api] = useSphere(() => ({
        position,
        args: [0.25],
        type: 'Static',
        restitution: 1.2,
        onCollide: (e) => {
            if (e.body.name === 'ball' && !isCollected) {
                onCollect();
            }
        }
    }));

    useEffect(() => {
        if (isCollected) {
            api.position.set(100, 100, 100);
        }
    }, [isCollected, api.position]);

    return (
        <mesh ref={ref as React.RefObject<THREE.Mesh>} name="coin" visible={!isCollected} castShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial metalness={0.8} roughness={0.2} color="gold" />
        </mesh>
    );
};

const Meteor = ({ position }: { position: [number, number, number] }) => {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position,
        args: [0.5],
    }));

    useFrame(() => {
        api.applyForce([0, -9.8, 0], [0, 0, 0]);
    });

    const meteorTexture = useTexture('/meteor_texture.jpg');

    return (
        <mesh ref={ref as React.RefObject<THREE.Mesh>} name="meteor" castShadow>
            <icosahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial map={meteorTexture} roughness={0.8} metalness={0.2} />
        </mesh>
    );
};

const Planet = ({ position, size }: { position: [number, number, number], size: number }) => {
    const texture = useTexture('/floor_texture.jpg');

    return (
        <mesh position={position}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

const Game = () => {
    const router = useRouter();
    const initialCoins: [number, number, number][] = [
        [2, 0.25, 2],
        [-2, 0.25, -2],
        [3, 0.25, -3],
        [-3, 0.25, 3],
        [4, 0.25, 4],
    ];
    const [coins, setCoins] = useState<{ position: [number, number, number], isCollected: boolean }[]>(
        initialCoins.map(position => ({ position, isCollected: false }))
    );
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [ballPosition, setBallPosition] = useState<[number, number, number]>([0, 1, 0]);
    const [meteors, setMeteors] = useState<[number, number, number][]>([]);

    const checkGameOver = (position: [number, number, number]) => {
        if (Math.abs(position[0]) > 5 || Math.abs(position[2]) > 5 || position[1] < -1) {
            setGameOver(true);
        }
    };

    const handleCoinCollect = (index: number) => {
        setCoins(prevCoins => prevCoins.map((coin, i) =>
            i === index ? { ...coin, isCollected: true } : coin
        ));
        setScore(prevScore => {
            const newScore = prevScore + 1;
            if (newScore === 5) {
                setGameOver(true);
            }
            return newScore;
        });
    };

    useEffect(() => {
        checkGameOver(ballPosition);
    }, [ballPosition]);

    useEffect(() => {
        if (gameOver) {
            const timer = setTimeout(() => {
                router.push("/gametest/rollaball");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [gameOver, router]);

    useEffect(() => {
        const interval = setInterval(() => {
            const x = Math.random() * 10 - 5;
            const z = Math.random() * 10 - 5;
            setMeteors(prev => [...prev, [x, 10, z]]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Canvas camera={{ position: [0, 5, 10] }} shadows>
                <color attach="background" args={['black']} />
                <Stars />
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 10, 0]} intensity={1.5} castShadow />
                <Physics>
                    <Ball position={ballPosition} onPositionChange={setBallPosition} onCollision={() => { }} />
                    <Plane />
                    {coins.map((coin, index) => (
                        <Coin key={index} position={coin.position} isCollected={coin.isCollected} onCollect={() => handleCoinCollect(index)} />
                    ))}
                    {meteors.map((position, index) => (
                        <Meteor key={index} position={position} />
                    ))}
                </Physics>
                <Planet position={[15, 0, 0]} size={5} />
                <Planet position={[-15, 10, -10]} size={3} />
                <Planet position={[0, -15, 15]} size={4} />
                <OrbitControls />
                <Text position={[-4.5, 4, 0]} fontSize={0.5} color="white">
                    取得コイン: {score}枚
                </Text>
                <Text position={[-4.5, 3.5, 0]} fontSize={0.3} color="white">
                    操作方法: 矢印キーまたはWASDキーで移動
                </Text>
            </Canvas>
            {gameOver && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <h2>{score === 5 ? 'GAME CLEAR！' : 'GAME OVER...'}</h2>
                        {score === 5 ? (
                            <>
                                <p>設計書のパスワード:1622 </p>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default function RollABall() {
    const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!gameOver) {
                setKeysPressed((prev) => ({ ...prev, [e.code]: true }));
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (!gameOver) {
                setKeysPressed((prev) => ({ ...prev, [e.code]: false }));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameOver]);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <KeysPressedContext.Provider value={{ keysPressed, gameOver }}>
                <Game />
            </KeysPressedContext.Provider>
        </div>
    );
}