import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import useAuth from 'shared/hooks/useAuth';

import NoticesFilters from './NoticesFilters/NoticesFilters';
import NoticesSearch from './NoticesSearch';
import NoticesCategoriesNav from './NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesCategoriesList from './NoticesCategoriesList/NoticesCategoriesList';

import Button from 'shared/components/Button';
import CircleButton from 'shared/components/CircleButton/CircleButton';
import Container from 'shared/components/Container';
import Icon from 'shared/components/Icon/Icon';
import { useMedia } from 'shared/hooks/useMedia';

import { useParams } from 'react-router-dom';
import { getNotices } from 'utils/ApiNotices';

function NoticesPage() {
  const isUpToWidth480 = useMedia(['(max-width: 480px)'], [true], false);

  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const handleAddPet = () => {
    isLoggedIn
      ? navigate('/add-pet')
      : alert('Please register or sign in to be able to add pet');
  };

  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notices, setNotices] = useState([]);

  let { categoryName } = useParams();

  useEffect(() => {
    getNotices({ category: categoryName, page: currentPage }).then(
      ({ data }) => {
        console.log(data.results);
        setNotices(data.results);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
      }
    );
  }, [categoryName, currentPage]);

  return (
    <Container>
      <NoticesSearch setItems={setNotices} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '43px',
        }}
      >
        <NoticesCategoriesNav />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <NoticesFilters />
          {isUpToWidth480 ? (
            <CircleButton
              style={{
                zIndex: '999',
                position: 'fixed',
                bottom: '50px',
                right: '24px',
              }}
              onClick={handleAddPet}
              disabled={!isLoggedIn}
            />
          ) : (
            <Button onClick={handleAddPet}>
              Add pet
              <Icon id="plus-small" />
            </Button>
          )}
        </div>
      </div>

      <NoticesCategoriesList
        totalPages={totalPages}
        currentPage={currentPage}
        notices={notices}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
}

export default NoticesPage;
