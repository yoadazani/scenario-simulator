import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rocket-attack')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>מטחים</div>
}
