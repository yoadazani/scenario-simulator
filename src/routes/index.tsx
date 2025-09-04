import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: IndexRoute,
})

function IndexRoute() {
    return <h1>
        ברוכים הבאים למערכת סימולטור
    </h1>
}

export default IndexRoute