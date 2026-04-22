import React from 'react';

const CelebrationAnimation: React.FC = () => {
    const confettiCount = 100;
    const colors = ['#00BFFF', '#a78bfa', '#FFD700', '#F94144', '#4FD1C5', '#FFFFFF'];

    return (
        <>
            <div 
                className="success-toast fixed bottom-8 left-1/2 z-[100] bg-[var(--color-surface)] text-[var(--color-text-main)] font-bold py-4 px-8 rounded-lg shadow-2xl border border-[var(--color-success)]"
                style={{ boxShadow: '0 0 20px var(--color-success)' }}
            >
                You nailed it! 🎉
            </div>
            <div className="fixed inset-0 pointer-events-none z-[99]">
                {Array.from({ length: confettiCount }).map((_, i) => {
                    const style = {
                        left: `${Math.random() * 100}%`,
                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                        width: `${Math.random() * 8 + 8}px`,
                        height: `${Math.random() * 5 + 5}px`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                        animation: `confetti-fall ${Math.random() * 2 + 3}s linear ${Math.random() * 1.5}s forwards`,
                    };
                    return <div key={i} className="confetti-piece" style={style}></div>;
                })}
            </div>
        </>
    );
};

export default CelebrationAnimation;
