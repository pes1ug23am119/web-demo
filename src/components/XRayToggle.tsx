import { useXRay } from '../context/XRayContext';

export default function XRayToggle() {
  const { xray, toggle } = useXRay();

  return (
    <button
      onClick={toggle}
      className="xray-toggle"
      aria-label={xray ? 'Disable X-Ray mode' : 'Enable X-Ray mode'}
    >
      <span className="relative flex h-2 w-2">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: 'var(--accent-color)' }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: 'var(--accent-color)' }}
        />
      </span>
      {xray ? 'Normal' : 'X-Ray'}
    </button>
  );
}
