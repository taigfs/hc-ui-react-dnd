import addIcon from '../../assets/icons/add-icon.svg'
import moveIcon from '../../assets/icons/move-icon.svg';
import scriptIcon from '../../assets/icons/script-icon.svg';
import timerIcon from '../../assets/icons/timer-icon.svg';
import endEventIcon from '../../assets/icons/end-event-icon.svg';
import startEventIcon from '../../assets/icons/start-event-icon.svg';
import preConditionsIcon from '../../assets/icons/pre-conditions-icon.svg';
import postConditionsIcon from '../../assets/icons/post-conditions-icon.svg';
import { IconType } from '../../types/icon.type';

interface DiagramIconProps {
  name: IconType;
  className?: string;
}

export const DiagramIcon = ({ name, className }: DiagramIconProps) => {
  switch (name) {
    case 'add': return <img src={addIcon} className={className} />;
    case 'move': return <img src={moveIcon} className={className} />;
    case 'script': return <img src={scriptIcon} className={className} />;
    case 'timer': return <img src={timerIcon} className={className} />;
    case 'start-event': return <img src={startEventIcon} className={className} />;
    case 'end-event': return <img src={endEventIcon} className={className} />;
    case 'pre-conditions': return <img src={preConditionsIcon} className={className} />;
    case 'post-conditions': return <img src={postConditionsIcon} className={className} />;
    default: return null;
  }
}