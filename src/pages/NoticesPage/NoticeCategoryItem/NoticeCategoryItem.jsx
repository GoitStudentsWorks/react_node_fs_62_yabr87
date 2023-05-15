import React, { useState, useCallback } from 'react';
import useAuth from 'shared/hooks/useAuth';
// import ModalApproveAction from 'components/ModalApproveAction/ModalApproveAction';

import {
  Card,
  CardImage,
  ImageDetails,
  CardImageContainer,
  ImageDetailsItem,
  ImageCategory,
  PhotoDescription,
  BelowItemContainer,
} from './NoticeCategoryItem.styles';

import Icon from 'shared/components/Icon/Icon';
import Button from 'shared/components/Button';

// import ModalNoticeTest from '../NoticeModalTest/NoticeModalTest';
import ModalApproveAction from 'components/ModalApproveAction';
import NoticeModal from 'components/ModalApproveAction/NoticeModal';

const AddToFavorite = () => {
  const { isLoggedIn } = useAuth();
  const [fill, setFill] = useState('transparent');

  const handleisAuthenticated = useCallback(() => {
    if (!isLoggedIn) {
      alert('Please sign in to add to favorites');
      return;
    }
  }, [isLoggedIn]);

  const handleMouseOver = useCallback(() => {
    if (isLoggedIn) {
      setFill('#54adff');
    }
  }, [isLoggedIn]);

  const handleMouseOut = useCallback(() => {
    if (isLoggedIn) {
      setFill('transparent');
    }
  }, [isLoggedIn]);

  return (
    <Button
      style={{
        zIndex: 999,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        right: 12,
        top: 12,
        background: '#cce4fb',
        borderRadius: '50%',
        border: 'none',
        outline: 'none',
        transition: 'fill 250ms ease',
      }}
      onMouseEnter={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseLeave={handleMouseOut}
      onBlur={handleMouseOut}
      onClick={handleisAuthenticated}
    >
      <Icon id="heart" h="22" w="22" f={fill} s="#54ADFF" strokeWidth="1.5" />
    </Button>
  );
};

const LearnMore = ({ onButtonClick }) => {
  const [isHoveredOrFocused, setIsHoveredOrFocused] = useState(false);
  return (
    <Button
      style={{
        width: '100%',
        marginTop: '20px',
        transition: 'stroke 250ms ease',
      }}
      onMouseEnter={() => setIsHoveredOrFocused(true)}
      onMouseLeave={() => setIsHoveredOrFocused(false)}
      onFocus={() => setIsHoveredOrFocused(true)}
      onBlur={() => setIsHoveredOrFocused(false)}
      onClick={onButtonClick}
    >
      Learn More
      {isHoveredOrFocused && <Icon id="paw" f="#FEF9F9" w="24" h="24" />}
    </Button>
  );
};

const NoticeCategoryItem = ({ notice }) => {
  const [isTrashHoveredOrFocused, setIsTrashHoveredOrFocused] = useState(false);
  const [trashIconColor, setTrashIconColor] = useState('#54ADFF');
  const { isLoggedIn, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [idPet, setIdPet] = useState(null);

  // const showPetCard = ({ id }) => {
  //   setIsModalOpen(true);
  //   // setIdPet(id);
  // };

  const handleHover = useCallback(() => {
    setIsTrashHoveredOrFocused(true);
    setTrashIconColor('#FFFFFF');
  }, []);

  const handleBlur = useCallback(() => {
    setIsTrashHoveredOrFocused(false);
    setTrashIconColor('#54ADFF');
  }, []);

  return (
    <Card>
      <AddToFavorite />
      <CardImageContainer>
        <CardImage src={notice.imageUrl} alt={notice.description} />
        <ImageCategory>
          {notice.category.replace('for-free', 'for free').replace(/-/g, '/')}
        </ImageCategory>

        <ImageDetails>
          <ImageDetailsItem>
            <Icon id="location" h="18" w="18" s="#54ADFF" />
            {notice.location}
          </ImageDetailsItem>
          <ImageDetailsItem>
            <Icon id="clock" h="18" w="18" s="#54ADFF" />
            {notice.age}
          </ImageDetailsItem>
          <ImageDetailsItem>
            {notice.sex === 'male' ? (
              <Icon id="male" h="18" w="18" s="#54ADFF" />
            ) : (
              <Icon id="female" h="18" w="18" s="#54ADFF" />
            )}
            {notice.sex}
          </ImageDetailsItem>
        </ImageDetails>
      </CardImageContainer>
      <BelowItemContainer>
        <PhotoDescription>{notice.description}</PhotoDescription>
        <LearnMore onButtonClick={() => setIsModalOpen(true)} />
        {/* <LearnMore onButtonClick={showPetCard} /> */}
      </BelowItemContainer>
      {/* {isModalOpen && <ModalNoticeTest close={() => setIsModalOpen(false)} />} */}
      {isModalOpen && (
        <ModalApproveAction close={() => setIsModalOpen(false)}>
          <NoticeModal close={() => setIsModalOpen(false)} />
        </ModalApproveAction>
      )}
      {isLoggedIn && user.userId === notice.userId && (
        <Button
          style={{
            zIndex: 999,
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            right: 12,
            top: 68,
            background: isTrashHoveredOrFocused ? '#54adff' : '#cce4fb',
            borderRadius: '50%',
            border: 'none',
            outline: 'none',
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleBlur}
          onFocus={handleHover}
          onBlur={handleBlur}
          onClick={() => setIsModalOpen(true)}
        >
          <Icon id="trash" h="22" w="22" s={trashIconColor} strokeWidth="1.5" />
        </Button>
      )}
    </Card>
  );
};

export default NoticeCategoryItem;
