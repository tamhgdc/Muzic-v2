import React from "react";
import { Tooltip, Pagination, Popconfirm, Input, Form } from "antd";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";

import { UseUploadMusic, UseModal } from "hooks";

import { ListLoading, ItemList } from "layouts";
import { Heading3, Heading6 } from "elements";

import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

import { ModalTypeEnum } from "const";
import { MusicType } from "type";
import "./style.css";
import { BsSearch } from "react-icons/bs";

const UploadMusic = ({ location }: any) => {
    const { toggle } = UseModal();
    const typingTimeout = React.useRef<any>(0);
    const page = Number(queryString.parse(location.search).page) || 1;
    const history = useHistory();
    const { data, loading, error, pagination, handleGetUploadMusic, handleDeleteMusic, handleSearchMusicUploads } =
        UseUploadMusic();
    // useEffect
    React.useEffect(() => {
        handleGetUploadMusic({ _limit: 36, _page: page });
    }, [error, handleGetUploadMusic, page]);
    // function
    const onChangePage = (page: number) => {
        const params = queryString.stringify({ page: page });
        const url = `/upload-music?${params}`;
        history.push(url);
    };

    const onSearchMusicUpload = (value: any) => {
        const search = value.search.trim();
        typingTimeout.current = setTimeout(() => {
            if (search) {
                const params = { query: search };
                handleSearchMusicUploads(params);
            } else {
                handleGetUploadMusic({ _limit: 36, _page: page });
            }
        }, 1000);
    };

    return (
        <div>
            <div className="flex flex-col justify-between gap-2 mb-4 sm:flex-row sm:gap-0">
                <Heading3 title="Danh Sách Tải Lên" className="text-white" />
                <div className="w-full max-w-xs">
                    <StyledForm
                        style={{
                            display: "flex",
                            width: "100%",
                        }}
                        onFinish={onSearchMusicUpload}
                    >
                        <StyledInput>
                            <button type="submit" className="flex">
                                <BsSearch
                                    style={{
                                        fontSize: "1.2rem",
                                        borderRight: "1px solid #ffff",
                                        paddingRight: "5px",
                                        color: "#ffff",
                                    }}
                                />
                            </button>
                        </StyledInput>
                        <Form.Item>
                            <StyledInput name="search">
                                <Input
                                    allowClear
                                    placeholder="Nhập tên bài hát..."
                                    style={{
                                        padding: "0px 10px",
                                    }}
                                    bordered={false}
                                />
                            </StyledInput>
                        </Form.Item>
                    </StyledForm>
                </div>
            </div>
            {loading ? (
                <ListLoading items={21} className="grid grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3" />
            ) : (
                <div className="group__upload__music">
                    <div>
                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
                            {data.map((item: MusicType, index: number) => (
                                <ItemList
                                    account_favorite={item.account_favorite}
                                    key={item._id}
                                    timeFormat={item.time_format}
                                    item={item}
                                    nameMusic={item.name_music}
                                    image={item.image_music}
                                    nameSinger={item.name_singer}
                                    _id={item._id}
                                    src_music={item.src_music}
                                    data={data}
                                    index={index}
                                    view={item.view}
                                    favorite={item.favorite}
                                    childrenPros={
                                        <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100">
                                            <Tooltip
                                                placement="bottom"
                                                title={<p className="m-0 text-white">Chỉnh sửa</p>}
                                            >
                                                <FiEdit
                                                    size="1.3rem"
                                                    className="text-white cursor-pointer hover:text-[#ff3465]"
                                                    onClick={() =>
                                                        toggle({
                                                            type: ModalTypeEnum.EDIT_UPLOAD_MUSIC,
                                                            title: "Chỉnh sửa bài hát",
                                                            others: item,
                                                        })
                                                    }
                                                />
                                            </Tooltip>
                                            <Popconfirm
                                                title={
                                                    <Heading6
                                                        title={`Bài hát "${item.name_music}" xóa vỉnh viễn bạn trắc không ?`}
                                                        className="text-white"
                                                    />
                                                }
                                                onConfirm={() => handleDeleteMusic({ _id: item._id })}
                                                okText="Có"
                                                cancelText="Không"
                                                placement="bottomRight"
                                            >
                                                <Tooltip
                                                    placement="bottom"
                                                    title={<p className="m-0 text-white">Xóa bài hát</p>}
                                                >
                                                    <AiFillDelete size="1.3rem" className="text-white cursor-pointer" />
                                                </Tooltip>
                                            </Popconfirm>
                                        </div>
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div className="group_pagination">
                        <StylePagination
                            onChange={onChangePage}
                            total={pagination._total}
                            defaultPageSize={36}
                            current={page}
                            defaultCurrent={1}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadMusic;

const StylePagination = styled(Pagination)`
    .ant-pagination-options {
        display: none;
    }
`;

const StyledInput = styled(Form.Item)`
    .ant-input-clear-icon,
    input {
        color: white !important;
    }
`;

const StyledForm = styled(Form)`
    .ant-form-item {
        margin-bottom: 0 !important;
    }
    .ant-input-affix-wrapper {
        background-color: initial !important;
        border: none;
    }
    background: #3e3f44;
    border-radius: 0.35rem;
    padding: 2px 8px;
`;
