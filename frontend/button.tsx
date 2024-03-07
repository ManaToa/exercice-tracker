interface ExButtonProps {
  execute: () => void
}

export default function ExButton({ execute }: ExButtonProps) {
  return (
    <button
      className='bg-darkColor text-lightColor p-1 font-bold uppercase hover:bg-mainColor w-full md:w-[5rem] mb-2'
      onClick={() => execute()}
    >
      Créer
    </button>
  )
}
