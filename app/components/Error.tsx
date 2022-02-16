import { Link } from "remix";

type ErrorProps = {
  status: number | string,
  title: string,
  description: string,
}
export default function Error({ status, title, description } : ErrorProps) {
  return (
    <main
      className="min-h-full bg-cover bg-top sm:bg-top"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <p className="text-base font-semibold text-neutral-300 uppercase tracking-wide">{status} error</p>
        <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-lg font-medium text-neutral-300">
          {description}
        </p>
        <div className="mt-6">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-black text-opacity-75 bg-white bg-opacity-90 hover:bg-opacity-75"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  )
}
