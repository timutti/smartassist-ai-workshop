export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-2 py-1">
      <span
        className="inline-block size-2 rounded-full bg-muted-foreground/60 animate-bounce-dot"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="inline-block size-2 rounded-full bg-muted-foreground/60 animate-bounce-dot"
        style={{ animationDelay: "0.16s" }}
      />
      <span
        className="inline-block size-2 rounded-full bg-muted-foreground/60 animate-bounce-dot"
        style={{ animationDelay: "0.32s" }}
      />
    </div>
  )
}
