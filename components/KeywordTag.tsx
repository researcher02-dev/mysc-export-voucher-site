interface KeywordTagProps {
  tag: string
  className?: string
}

export default function KeywordTag({ tag, className = '' }: KeywordTagProps) {
  const display = tag.startsWith('#') ? tag : `#${tag}`
  return (
    <span className={`text-xs font-medium text-[#99a1af] whitespace-nowrap ${className}`}>
      {display}
    </span>
  )
}
