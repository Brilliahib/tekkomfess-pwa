export default function HeaderTitle(props) {
  return (
    <>
      <div className="mt-7 mb-8 text-left space-y-2">
        <h1 className="text-2xl font-bold">{props.title}</h1>
      </div>
    </>
  );
}
