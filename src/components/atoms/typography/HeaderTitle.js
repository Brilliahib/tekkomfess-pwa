export default function HeaderTitle(props) {
  return (
    <>
      <div className="mt-7 md:mb-8 mb-4 text-left space-y-2">
        <h1 className="text-3xl font-paytone">{props.title}</h1>
        <p className="text-[#737373]">{props.subtitle}</p>
      </div>
    </>
  );
}
