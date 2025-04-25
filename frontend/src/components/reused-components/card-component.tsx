interface ICardComponent {
    header: string;
    paragraph: string;
    IconComponent: React.FC;
  }

export const CardComponent = ({
    header,
    paragraph,
    IconComponent: Icon,
  }: ICardComponent) => {
    return (
      <div>
        <div>{<Icon />}</div>
        <p className="mt-4 text-xl">{header}</p>
        <p className="mt-2 text-base">{paragraph}</p>
      </div>
    );
  };
  