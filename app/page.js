import { ProjectList } from "@/components/ProjectList";
import { NewProject } from "@/components/NewProject";

export default function Home() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-5">
        <h1 className="flex items-center text-xl font-medium text-gray-500/80">Panel</h1>
        <NewProject />
      </div>
      <ProjectList />
    </div>
  )
}
