interface IconProps {
  id: string;
  className?: string;
}

export default function Icon({ id, className }: IconProps) {
  return (
    <svg className={`${className}`}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
