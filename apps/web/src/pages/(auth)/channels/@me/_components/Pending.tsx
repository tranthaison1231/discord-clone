import { type Friend } from '@/apis/friends';
import { Input } from '@/components/ui/input';

interface PendingProps {
  friends: Friend[];
}

export default function Pending({ friends }: PendingProps) {
  return (
    <div className='ml-8'>
      <Input placeholder='Search' />
      <p className='py-4 border-b-2 border-gray-500'>
        {' '}
        Pending - {friends.length}
      </p>

      {friends?.map((friend) => (
        <div key={friend.id} className='flex gap-4'>
          <img
            src='https://i.pinimg.com/originals/ea/85/b7/ea85b7af823d7c98be67119ddf05d656.jpg'
            alt=''
            className='object-cover rounded-full w-14 h-14'
          />
          <div className='flex space-y-2'>
            <p>{friend.user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
