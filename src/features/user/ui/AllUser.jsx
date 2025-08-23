import React, { useCallback, useState } from "react";
import { Table, Input, ConfigProvider, Modal } from "antd";
import UserDetails from "./UserDetails";
import toast from "react-hot-toast";
import { useStatusQuery, useUserBlockMutation, useUserUnblockMutation } from "../../../Redux/Apis/service/statusApis";
import { userColumns } from "./userColumns";

function AllUser() {
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const { data: status, isLoading } = useStatusQuery({ search })
  const [userBlock, { isLoading: blockLoading }] = useUserBlockMutation()
  const [userUnblock, { isLoading: unblockLoading }] = useUserUnblockMutation()


  const handleToggleBlock = async (record) => {
    try {
      if (record.isBlocked) {
        await userUnblock({ userID: record?._id }).unwrap().then((res) => {
          console.log(res)
          if (res?.success) {
            toast.success("User Unblocked")
          }
        })
      } else {
        await userBlock({ userID: record?._id }).unwrap().then((res) => {
          if (res?.success) {
            toast.success("User Blocked")
          }
        })
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong')
    }
  };


  const handleViewUser = useCallback((record) => {
    setShowUserDetails(true)
    setSelectedItem(record)
  }, [setShowUserDetails, setSelectedItem]);

  const handleSearch = useCallback((value) => {
    setSearch(value.target.value)
  }, [setSearch]);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 justify-end">
        <Input
          placeholder="Search users"
          onChange={handleSearch}
          size="large"
          className="mb-4 max-w-[400px]"
        />
      </div>
      <h1 className="text-2xl text-white font-bold mb-4">All Users</h1>
      <ConfigProvider theme={{
        components: {
          Table: {
            colorBgContainer: "rgb(42,42,42)",
            colorText: "rgba(255,255,255,0.88)",
            colorTextHeading: "rgba(255,255,255,0.88)"
          }
        }
      }}>
        <Table
          loading={blockLoading || unblockLoading || isLoading}
          scroll={{ x: "max-content" }}
          columns={userColumns(handleViewUser, handleToggleBlock)}
          bordered
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: false,
            position: ["bottomCenter"],
            size: "large",
            defaultCurrent: page,
            total: status?.users?.length,
            onChange: (page) => {
              setPage(page)
            },
          }}
          dataSource={status?.users}
        /></ConfigProvider>
      <Modal
        open={showUserDetails}
        onCancel={() => setShowUserDetails(false)}
        centered
        footer={null}
        width={600}
        destroyOnClose
      >
        <UserDetails selectedItem={selectedItem} />
      </Modal>
    </div>
  );
}

export default AllUser;
