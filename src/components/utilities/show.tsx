import React from 'react';

import type { FCC } from '@/types/header';

export const Show: FCC<{ when?: boolean }> = (props) => {
  return <>{props.when ? <>{props.children}</> : null}</>;
};
