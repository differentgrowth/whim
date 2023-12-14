import { GearIcon } from '@radix-ui/react-icons';

const Loading = () => {
  return (
    <main className="mt-12">
      <GearIcon className="w-24 h-24 mx-auto animate-spin" />
    </main>
  );
};

export default Loading;