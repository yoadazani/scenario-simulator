import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forces')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>כוחות</div>
}
