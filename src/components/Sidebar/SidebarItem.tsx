import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

const SidebarItem = forwardRef<
  HTMLButtonElement,
  ButtonProps & { title: string; collapse: boolean; description?: string; active?: boolean; newPostItem?: boolean }
>(({ children, title, className, active, collapse, newPostItem, ...props }, ref) => {
  const { t } = useTranslation()
  const btnTitle = !collapse ? title : <span className={`font-agnostric font-normal ${newPostItem ? 'hidden' : null}`}>{title.charAt(0)}</span>

  return (
    <Button
      className={cn(
        active && 'text-primary hover:text-primary/90',
        className
      )}
      variant="ambient"
      title={t(title)}
      ref={ref}
      {...props}
    >
      {children}
      {btnTitle}
    </Button>
  )
})
SidebarItem.displayName = 'SidebarItem'
export default SidebarItem
