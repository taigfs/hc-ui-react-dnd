import addIcon from '../../assets/icons/add-icon.svg'
import moveIcon from '../../assets/icons/move-icon.svg';
import scriptIcon from '../../assets/icons/script-icon.svg';
import timerIcon from '../../assets/icons/timer-icon.svg';
import endEventIcon from '../../assets/icons/end-event-icon.svg';
import startEventIcon from '../../assets/icons/start-event-icon.svg';
import preConditionsIcon from '../../assets/icons/pre-conditions-icon.svg';
import postConditionsIcon from '../../assets/icons/post-conditions-icon.svg';
import clickIcon from '../../assets/icons/click-icon.svg';
import closeIcon from '../../assets/icons/close-icon.svg';
import openIcon from '../../assets/icons/open-icon.svg';
import typeIcon from '../../assets/icons/type-icon.svg';
import { IconType } from '../../types/icon.type';
import styled from 'styled-components';

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
    case 'browser-click': return <img src={clickIcon} className={className} />;
    case 'browser-type': return <img src={typeIcon} className={className} />;
    case 'browser-close': return <img src={closeIcon} className={className} />;
    case 'browser-open': return <img src={openIcon} className={className} />;
    default: return null;
  }
}