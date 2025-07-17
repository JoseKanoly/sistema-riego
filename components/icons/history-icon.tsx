import { History } from "lucide-react"
import type { LucideProps } from "lucide-react"

/**
 * HistoryIcon – ícono de historial reutilizable en toda la app.
 */
export function HistoryIcon(props: LucideProps) {
  return <History {...props} />
}

// También puedes hacer exportación directa:
// export { History as HistoryIcon } from "lucide-react"
