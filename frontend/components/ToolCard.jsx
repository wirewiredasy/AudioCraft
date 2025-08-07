import Link from 'next/link'

export default function ToolCard({
  title,
  description,
  href,
  icon: IconComponent,
  gradient = "from-purple-500 to-blue-600",
  hoverColor = "purple-300"
}) {
  return (
    <Link href={href} className="tool-card group">
      <div className={`tool-card-icon bg-gradient-to-br ${gradient}`}>
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
    </Link>
  )
}