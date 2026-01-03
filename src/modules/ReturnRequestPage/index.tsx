'use client';

import { useReturnRequestsQuery } from '@/api/return-request/queries';
import type { IReturnRequestQuery } from '@/api/return-request/types';
import SearchTable from '@/components/SearchTable';
import H3 from '@/components/text/H3';
import { DateRangePicker } from '@/components/ui/date-range-picker/index';
import { Label } from '@/components/ui/label';
import SelectCustom from '@/components/ui/select-custom';
import TableBase, { TablePagination } from '@/components/ui/table';
import { HStack, VStack } from '@/components/utilities';
import Container from '@/components/wrapper/Container';
import { format } from 'date-fns';
import { useState } from 'react';
import { COLUMNS, RETURN_REQUEST_STATUS_LABELS, defaultQuery } from './libs/consts';

const ReturnRequestPage = () => {
  const [paramsQuery, setParamsQuery] = useState<Partial<IReturnRequestQuery>>(defaultQuery);

  const { data, isFetching, refetch } = useReturnRequestsQuery({
    variables: paramsQuery,
  });

  const handlePageChange = (page: number) => {
    setParamsQuery((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (limit: number) => {
    setParamsQuery((prev) => ({ ...prev, page: 1, limit }));
  };

  const handleStatusChange = (selected: any) => {
    setParamsQuery((prev) => ({
      ...prev,
      status: selected.value === 'ALL' ? undefined : selected.value,
      page: 1,
    }));
  };

  const handleDateRangeChange = (values: any) => {
    if (values.range) {
      setParamsQuery((prev) => ({
        ...prev,
        startDate: format(values.range.from, 'yyyy-MM-dd'),
        endDate: format(new Date(values.range.to.setHours(23, 59, 0, 0)), 'yyyy-MM-dd HH:mm:ss'),
        page: 1,
      }));
    } else {
      const { startDate, endDate, ...rest } = paramsQuery;
      setParamsQuery(rest);
    }
  };

  const statusOptions = [
    { label: 'Tất cả trạng thái', value: 'ALL' },
    ...Object.entries(RETURN_REQUEST_STATUS_LABELS).map(([value, label]) => ({ label, value })),
  ];

  return (
    <Container>
      <VStack spacing={32}>
        <HStack pos="apart">
          <H3>Quản lý yêu cầu hoàn trả</H3>
        </HStack>

        <VStack spacing={16}>
          <HStack pos="apart" className="flex-col gap-4 sm:flex-row">
            <SearchTable
              listFilter={[]}
              loading={isFetching}
              onSearch={({ key, value }) => {
                if (value) {
                  setParamsQuery((prev) => ({
                    ...prev,
                    page: 1,
                    search: value,
                  }));
                } else {
                  setParamsQuery(defaultQuery);
                }
              }}
            />

            <HStack pos="apart" className="flex-col gap-4 sm:flex-row">
              <DateRangePicker
                onUpdate={handleDateRangeChange}
                initialDateFrom={paramsQuery.startDate ? format(new Date(paramsQuery.startDate), 'yyyy-MM-dd') : undefined}
                initialDateTo={paramsQuery.endDate ? format(new Date(paramsQuery.endDate), 'yyyy-MM-dd') : undefined}
                align="start"
                locale="en-US"
                btnProps={{
                  variant: 'outline',
                  className: 'h-9 w-full sm:w-[300px]',
                }}
              />
            </HStack>
          </HStack>

          <HStack className="flex-wrap gap-4" pos="right">
            <div className="w-full sm:w-[200px]">
              <Label className="font-medium text-grey-500 text-xs">Trạng thái</Label>
              <SelectCustom
                height="36px"
                data={statusOptions}
                value={paramsQuery.status || 'ALL'}
                onChange={handleStatusChange}
                placeholder="Chọn trạng thái"
              />
            </div>
          </HStack>
        </VStack>

        <TableBase columns={COLUMNS(refetch)} dataSource={data?.items || []} loading={isFetching} />

        <TablePagination
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pagination={data?.meta || {}}
          loading={isFetching}
        />
      </VStack>
    </Container>
  );
};

export default ReturnRequestPage;
