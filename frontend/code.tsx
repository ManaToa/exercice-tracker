interface CodeLookProps {
  text: string
}

export default function CodeLook({ text }: CodeLookProps) {
  return <span className='py-1 px-2 bg-ligthColorHover rounded-md font-mono font-bold'>{text}</span>
}
