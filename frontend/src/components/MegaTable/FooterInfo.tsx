import React from 'react';

interface FooterInfoProps {
  page: number;
  total: number;
  count: number;
};

const FooterInfo = ({page, total, count}: FooterInfoProps) => {
  const baseIndex = (page - 1) * 10;
  const start = baseIndex + 1;
  const end = Math.min(baseIndex + 10, baseIndex + count);


  return (
    <div>
      <p className="mb-sm-0">Showing {start} to {end} of {total} entries</p>
    </div>
  );
};

export default FooterInfo;
