import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sirens')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>צופרים</div>
}
