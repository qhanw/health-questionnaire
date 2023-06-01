// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  // return request<API.CurrentUser>('/api/currentUser', {
  //   method: 'GET',
  //   ...(options || {}),
  // });

  return new Promise((resolutionFunc, rejectionFunc) => {
    setTimeout(() => {
      resolutionFunc({
        access: 'admin',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        name: 'Admin',
        userid: '00000001',
      });
    }, 1000);
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
