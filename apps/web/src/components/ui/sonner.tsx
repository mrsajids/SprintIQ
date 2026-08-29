import { useTheme } from '@/components/common/ThemeProvider'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl font-sans group-[.toaster]:py-3.5 group-[.toaster]:px-4 group-[.toaster]:pr-9',
          title: 'text-xs font-semibold text-foreground',
          description: 'group-[.toast]:text-muted-foreground text-xs font-normal mt-0.5',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground text-xs font-semibold rounded-lg',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground text-xs font-semibold rounded-lg',
          closeButton:
            '!left-auto !right-2.5 !top-2.5 !transform-none !bg-transparent hover:!bg-muted/80 !border-transparent !text-muted-foreground hover:!text-foreground !rounded-md !w-5 !h-5 !opacity-60 hover:!opacity-100 !transition-all !cursor-pointer',
          success:
            'group-[.toaster]:border-emerald-500/30 group-[.toaster]:bg-emerald-500/5 group-[.toaster]:text-emerald-900 dark:group-[.toaster]:text-emerald-300',
          error:
            'group-[.toaster]:border-destructive/30 group-[.toaster]:bg-destructive/5 group-[.toaster]:text-destructive dark:group-[.toaster]:text-red-400',
          info:
            'group-[.toaster]:border-primary/30 group-[.toaster]:bg-primary/5 group-[.toaster]:text-primary',
          warning:
            'group-[.toaster]:border-amber-500/30 group-[.toaster]:bg-amber-500/5 group-[.toaster]:text-amber-600 dark:group-[.toaster]:text-amber-400',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
