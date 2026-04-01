"use client"

import { ShieldCheck, Users, Database, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function MainCenter() {
  return (
    <main className="relative flex-1 flex flex-col items-center justify-center overflow-hidden bg-white px-6 py-20">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 -z-10 h-full w-full">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-orange-50/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-100 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-3xl">
          <div className="flex gap-3 justify-center my-8 flex-wrap">
  <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">JWT Auth</span>
  <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">Admin Access</span>
  <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">MongoDB</span>
</div>
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black mb-6">
         Scalable REST API <span className="text-orange-500">with REST API</span> Authentication & Role Acces
        </h2>
        <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-10">
          A seamless interface to build and monitor your backend. 
          Manage authentication, scale CRUD operations, and protect routes with zero friction.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
  <Link href="/my-task">
    <button className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full">
      Open Tasks <ArrowRight size={18} />
    </button>
  </Link>

  <a href={process.env.NEXT_PUBLIC_SWAGGER_URL} target="_blank">
    <button className="px-8 py-4 rounded-full border border-zinc-200">
      Swagger Docs
    </button>
  </a>
</div>
      </div>

     

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <FeatureCard 
          icon={<ShieldCheck className="text-orange-500" />}
          title="Authentication"
          desc="JWT login, bcrypt password hashing, secure cookie handling"
        />
        <FeatureCard 
          icon={<Users className="text-orange-500" />}
          title="Role Access"
          desc="Admin/User route protection via middleware and token decoding"
        />
        <FeatureCard 
          icon={<Database className="text-orange-500" />}
          title="CRUD Operations"
          desc="Task module with full Create, Read, Update, Delete operations"
        />
      </div>
     
      <div className="mt-16 text-center text-sm text-zinc-500">
  Built with Next.js, Express, MongoDB, JWT, Redux Toolkit, Tanstack and Tailwind CSS
</div>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group p-8 rounded-2xl border border-zinc-100 bg-white hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
      <div className="mb-4 p-3 bg-zinc-50 rounded-xl w-fit group-hover:bg-orange-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-zinc-900 mb-2">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  )
}