import PopoverMember from "./PopoverMember";

const CATEGORIES = [
  {
    id: 1,
    name: 'Đà Nẵng',
    members: [
      {
        id: 1,
        name: 'John',
        avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
      },
    ],
  },
  {
    id: 2,
    name: 'Offline',
    members: [
      {
        id: 1,
        name: 'Tin Nguyen',
        avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
      },
      {
        id: 2,
        name: 'Son Tran',
        avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
      },
    ],
  },
];

export default function MemberList() {
  return (
    <div className="flex flex-col gap-8">
      {CATEGORIES.map((category) => (
        <div key={category.id} className="flex flex-col gap-4">
          <p className="font-bold">{category.name} - { category.members.length}</p>
          <div className="flex flex-col gap-4">
            {category.members.map((member) => (
              <PopoverMember member={member} key={member.id}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
