import { brand } from "../data";

/** Wordmark: a small gold "B" glyph plus the BrokerVox name. */
export default function Mark({ small = false }: { small?: boolean }) {
  return (
    <a className="brand" href="#top" aria-label={`${brand.name} home`}>
      <svg width={small ? 26 : 30} height={small ? 26 : 30} viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#C9A227" />
        <path
          d="M20 16h14a10 10 0 0 1 6.7 17.4A11 11 0 0 1 36 52H20Zm8 8v7h6a3.5 3.5 0 0 0 0-7Zm0 14v7h8a3.5 3.5 0 0 0 0-7Z"
          fill="#0B1F3A"
        />
      </svg>
      {brand.name}
      {!small && <small>by {brand.parent}</small>}
    </a>
  );
}
