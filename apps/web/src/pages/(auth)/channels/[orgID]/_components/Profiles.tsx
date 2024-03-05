import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import UploadAvatarModal from './UploadAvatarModal';

export default function Profiles() {
  return (
    <div className='p-6'>
      <h1>Profile</h1>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='account'>User Profile</TabsTrigger>
          <TabsTrigger value='password'>Server Profile</TabsTrigger>
        </TabsList>
        <TabsContent
          value='account'
          className='space-y-6 rounded-lg bg-foreground/15'
        >
          <div className='flex gap-4'>
            <div className={cn('rounded-t-md h-14 relative')}>
              <div className='absolute w-20 h-20 p-2 rounded-full bg-slate-950 -bottom-10 left-4'>
                <UploadAvatarModal />
              </div>
            </div>
            <div className='p-4 pt-16 mt-10'>
              <div className='w-[20rem] h-40 p-4 rounded-md bg-primary-foreground/10'>
                <p> Phuoc Thanh</p>
                <hr className='my-2' />
                <p> Roles </p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='password'>sserver</TabsContent>
      </Tabs>
    </div>
  );
}
