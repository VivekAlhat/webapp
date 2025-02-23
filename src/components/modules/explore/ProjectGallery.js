import React, { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import ProjectCard from 'components/common/cards/ProjectCard';
import Loader from 'components/common/elements/Loader';
import fetcher from 'utils/fetcher';
import { useRouter } from 'next/router';

let PAGE_SIZE = 40;

const ProjectGallery = ({
  user,
  stack = false,
  category = false,
  sort,
  range,
  query,
  count = 40,
  feature = false,
}) => {
  const router = useRouter();

  if (count !== null) PAGE_SIZE = count;

  let url = `${process.env.BASEURL}/api/projects/get?size=${PAGE_SIZE}&sort=${sort}&projectType=PROJECT&range=${range}`;

  if (category) {
    if (category?.slug === 'opentocollab') {
      url = `${process.env.BASEURL}/api/projects/get?size=${PAGE_SIZE}&sort=${sort}&projectType=PROJECT&lookingForCollabs=true`;
    } else {
      url = `${process.env.BASEURL}/api/projects/find?size=${PAGE_SIZE}&sort=${sort}&userId=&projectType=PROJECT&range=${range}&category=${category.term}`;
    }
  }

  if (stack) {
    // url = `${process.env.BASEURL}/api/projects/find?size=${PAGE_SIZE}&sort=${sort}&userId=&projectType=PROJECT&range=${range}&term=${stack?.terms}`;
    url = `${process.env.BASEURL}/api/search/projects?size=${PAGE_SIZE}&sort=${sort}&userId=&projectType=PROJECT&range=${range}&term=${stack?.terms}`;
  }

  if (router.pathname === '/search' && query !== '') {
    url = `${process.env.BASEURL}/api/search/projects?size=${PAGE_SIZE}&sort=${sort}&userId=&projectType=PROJECT&range=${range}&term=${query}`;
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `${url}&page=${index}`,
    fetcher
  );

  const posts = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const projectCards = useMemo(() => {
    const projectList = posts;
    return projectList.map((project) => (
      <div className="w-80 grow xl:max-w-[400px]" key={project.projectId}>
        <ProjectCard project={project} user={user} feature={feature} />
      </div>
    ));
  });

  return (
    <>
      <div>
        {posts && !isEmpty && (
          <div className={'relative flex flex-wrap gap-8'}>{projectCards}</div>
        )}

        {isEmpty && (
          <div className="relative flex flex-col text-center sm:mt-4">
            <span>
              No projects found. Try different filters or a different search.
            </span>
          </div>
        )}

        {count == 40 && !isReachingEnd && (
          <div className="my-10 flex justify-center">
            {isLoadingMore && (
              <div className="py-1">
                <Loader />
              </div>
            )}
            {count == 40 && !isLoadingMore && (
              <button
                className="btn btn-secondary btn-with-icon"
                onClick={() => setSize(size + 1)}
              >
                <span>Load more</span>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectGallery;
