import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import Logo from '@/assets/Logo'
import { CODY_PUBKEY, MAX_PUBKEY } from '@/constants'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import { useState } from 'react'
import Username from '../Username'

export default function AboutInfoDialog({ children }: { children: React.ReactNode }) {
  const { isSmallScreen } = useScreenSize()
  const [open, setOpen] = useState(false)

  const content = (
    <>
      <Logo className="w-[150px]" />
      <div className="text-muted-foreground">
        It's a fork of the popular <a href="https://jumble.social">Jumble</a> NOSTR client, reimagined for lovers of cozy medieval gothic aesthetics.
      </div>
      <div>
        Adapted by <Username userId={MAX_PUBKEY} className="inline-block text-primary" showAt /> standing on the shoulders of <Username userId={CODY_PUBKEY} className="inline-block text-primary" showAt />
      </div>
      <div>
        Source code:{' '}
        <a
          href="https://github.com/mparfeniuk/agnostric"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          GitHub
        </a>
        <div className="text-sm text-muted-foreground">
          If you like Agnostric, please consider giving it a star ⭐
        </div>
      </div>
    </>
  )

  if (isSmallScreen) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <div className="space-y-4 p-4">{content}</div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  )
}
