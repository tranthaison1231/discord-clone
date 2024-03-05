import { uploadFile } from '@/apis/upload';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Pencil, UploadCloud } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

type SliderProps = React.ComponentProps<typeof Slider>;
export default function UploadAvatarModal({ ...props }: SliderProps) {
  const [imageFile, setImageFile] = useState<string | undefined>(undefined);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };
  const onUpLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await uploadFile(formData);
    setImageFile(data.url);
    setIsEditAvatar(true);
  };
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && isEditAvatar) {
      // check if isEditAvatar is true and isOpen is false
      setIsEditAvatar(false);
      setImageFile(undefined);
    }
    if (!isOpen && !isEditAvatar) {
      // check if isEditAvatar is false and isOpen is false
      setIsOpenImage(false);
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild className=''>
          {isEditAvatar ? (
            <Pencil className='w-8 h-8 cursor-pointer' />
          ) : (
            <img src={imageFile} alt='' className='w-16 h-16 rounded-full' />
          )}
        </PopoverTrigger>
        <PopoverContent className='space-y-4 w-60'>
          <Dialog onOpenChange={handleOpenChange} open={isOpenImage}>
            <DialogTrigger asChild onClick={() => setIsOpenImage(true)}>
              <h1 className='p-2 rounded-md cursor-pointer hover:bg-gray-400'>
                Change Avatar
              </h1>
            </DialogTrigger>
            {isEditAvatar ? (
              <DialogContent className='h-[40rem] sm:max-w-[30rem]'>
                <h1 className='text-xl font-bold'>Edit Avatar</h1>
                <Cropper
                  image={imageFile}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 3}
                  classes={{
                    containerClassName:
                      'w-96 h-96 !left-1/2 -translate-x-1/2 -translate-y-1/2 !top-1/2 relative',
                  }}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
                <Slider
                  value={[zoom]}
                  max={100}
                  step={1}
                  onValueChange={([value]) => setZoom(value)}
                  className='top-[20rem] mt-32'
                  {...props}
                />
                <Button
                  className='flex justify-center w-40 ml-auto mt-80'
                  onClick={() => setIsEditAvatar(false)}
                >
                  Apply
                </Button>
              </DialogContent>
            ) : (
              <DialogContent className='sm:max-w-[425px]'>
                <h1>Select Avatar</h1>
                <div className='flex justify-between'>
                  <div className='relative w-40 p-2 space-y-4 overflow-hidden bg-gray-400 rounded-md cursor-pointer h-36'>
                    <div className='flex items-center justify-center w-20 h-20 mx-auto mt-2 rounded-full bg-primary'>
                      {imageFile ? (
                        <img
                          src={imageFile}
                          alt='avatar'
                          className='object-cover w-full h-full rounded-full'
                        />
                      ) : (
                        <UploadCloud />
                      )}
                    </div>
                    <p className='flex justify-center'>Upload image</p>
                    <input
                      type='file'
                      className='absolute top-0 block w-full h-full opacity-0 cursor-pointer pin-r pin-t'
                      onChange={onUpLoad}
                      accept='image/*'
                    />
                  </div>
                  <div className='w-40 p-2 bg-gray-400 rounded-md h-36'></div>
                </div>
              </DialogContent>
            )}
          </Dialog>
          <div className='p-2 rounded-md hover:bg-gray-400'>
            Change decoration
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
