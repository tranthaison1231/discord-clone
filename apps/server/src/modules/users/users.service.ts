import { db } from '@/lib/db';
import { UpdateMeDto } from '@/modules/users/dto/update-me.dto';
import { User } from '@prisma/client';

export const UsersService = {
  updateMe: async (user: User, updateMeDto: UpdateMeDto) => {
    const { password, salt, ...me } = await db.user.update({
      where: {
        id: user.id,
      },
      data: updateMeDto,
    });

    return me;
  },
  getByUsername: async (username: string) => {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  },
};
