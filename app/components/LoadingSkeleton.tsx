'use client';

/* ─── Skeleton shimmer base ─── */
const shimmerStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeletonShimmer 1.5s infinite',
  borderRadius: '10px',
};

export function SkeletonStyle() {
  return (
    <style>{`
      @keyframes skeletonShimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  );
}

/* ─── Card skeleton (services, portfolio, blog) ─── */
export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      <SkeletonStyle />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px 0',
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '22px',
            padding: '32px',
          }}>
            {/* Icon */}
            <div style={{ ...shimmerStyle, width: '56px', height: '56px', borderRadius: '16px', marginBottom: '20px' }} />
            {/* Title */}
            <div style={{ ...shimmerStyle, height: '22px', width: '70%', marginBottom: '14px' }} />
            {/* Desc lines */}
            <div style={{ ...shimmerStyle, height: '14px', width: '100%', marginBottom: '8px' }} />
            <div style={{ ...shimmerStyle, height: '14px', width: '85%', marginBottom: '8px' }} />
            <div style={{ ...shimmerStyle, height: '14px', width: '60%', marginBottom: '24px' }} />
            {/* Button */}
            <div style={{ ...shimmerStyle, height: '36px', width: '120px', borderRadius: '50px' }} />
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Team card skeleton ─── */
export function TeamSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      <SkeletonStyle />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '22px',
        padding: '20px 0',
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '24px',
            padding: '44px 32px',
            textAlign: 'center',
          }}>
            {/* Avatar */}
            <div style={{ ...shimmerStyle, width: '106px', height: '106px', borderRadius: '50%', margin: '0 auto 22px' }} />
            {/* Name */}
            <div style={{ ...shimmerStyle, height: '22px', width: '60%', margin: '0 auto 12px' }} />
            {/* Role */}
            <div style={{ ...shimmerStyle, height: '14px', width: '40%', margin: '0 auto 16px' }} />
            {/* Bio lines */}
            <div style={{ ...shimmerStyle, height: '12px', width: '90%', margin: '0 auto 8px' }} />
            <div style={{ ...shimmerStyle, height: '12px', width: '75%', margin: '0 auto 8px' }} />
            <div style={{ ...shimmerStyle, height: '12px', width: '55%', margin: '0 auto' }} />
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Stat skeleton ─── */
export function StatSkeleton({ count = 9 }: { count?: number }) {
  return (
    <>
      <SkeletonStyle />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))',
        gap: '12px',
        padding: '20px 0',
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '18px',
            padding: '32px 14px',
            textAlign: 'center',
          }}>
            <div style={{ ...shimmerStyle, height: '40px', width: '70%', margin: '0 auto 14px' }} />
            <div style={{ ...shimmerStyle, height: '12px', width: '80%', margin: '0 auto' }} />
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Gallery skeleton ─── */
export function GallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      <SkeletonStyle />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px',
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '14px',
            overflow: 'hidden',
          }}>
            <div style={{ ...shimmerStyle, height: '180px', borderRadius: '12px 12px 0 0' }} />
            <div style={{ padding: '12px' }}>
              <div style={{ ...shimmerStyle, height: '14px', width: '70%', marginBottom: '8px' }} />
              <div style={{ ...shimmerStyle, height: '12px', width: '45%' }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Blog skeleton ─── */
export function BlogSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      <SkeletonStyle />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        padding: '20px 0',
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '20px',
            padding: '28px',
          }}>
            <div style={{ ...shimmerStyle, height: '160px', borderRadius: '12px', marginBottom: '20px' }} />
            <div style={{ ...shimmerStyle, height: '20px', width: '80%', marginBottom: '12px' }} />
            <div style={{ ...shimmerStyle, height: '14px', width: '100%', marginBottom: '8px' }} />
            <div style={{ ...shimmerStyle, height: '14px', width: '65%', marginBottom: '20px' }} />
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px',
            }}>
              <div style={{ ...shimmerStyle, height: '12px', width: '30%' }} />
              <div style={{ ...shimmerStyle, height: '12px', width: '25%' }} />
              <div style={{ ...shimmerStyle, height: '12px', width: '20%' }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Section skeleton (generic full-section loader) ─── */
export function SectionSkeleton({ label = 'Loading...' }: { label?: string }) {
  return (
    <>
      <SkeletonStyle />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '60px 20px',
      }}>
        <div style={{ ...shimmerStyle, height: '12px', width: '80px', borderRadius: '50px' }} />
        <div style={{ ...shimmerStyle, height: '40px', width: '320px' }} />
        <div style={{ ...shimmerStyle, height: '16px', width: '240px' }} />
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          border: '3px solid rgba(212,160,23,0.2)',
          borderTop: '3px solid #D4A017',
          animation: 'spin 1s linear infinite',
          marginTop: '20px',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '3px',
          color: 'rgba(212,160,23,0.5)',
        }}>
          {label.toUpperCase()}
        </p>
      </div>
    </>
  );
}