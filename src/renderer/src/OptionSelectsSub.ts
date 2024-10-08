export interface OptionSelects {
  name: string,//名称
  icon: string,//图标
  url: string,//链接
  type: string,//类型
  id: string,//id
  key: string,//唯一键
  breadcrumb: string[],
  Pagination: {
    page: number,
    total: number
  },
  PaginationUrl: string//分页url${0}是占位符
}

export const sites: OptionSelects[] = [
  {
    PaginationUrl: '/sh/12--------${0}---2024.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2024.html',
    breadcrumb: ['首页', '国产剧', '2024'],
    name: '2024年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 10
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2023.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2023.html',
    breadcrumb: ['首页', '国产剧', '2023'],
    name: '2023年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 14
    }

  },
  {
    PaginationUrl: '/sh/12--------${0}---2022.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2022.html',
    breadcrumb: ['首页', '国产剧', '2022'],
    name: '2022年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 12
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2021.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2021.html',
    breadcrumb: ['首页', '国产剧', '2021'],
    name: '2021年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 11
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2020.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2020.html',
    breadcrumb: ['首页', '国产剧', '2020'],
    name: '2020年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 11
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2019.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2019.html',
    breadcrumb: ['首页', '国产剧', '2019'],
    name: '2019年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 10
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2018.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2018.html',
    breadcrumb: ['首页', '国产剧', '2018'],
    name: '2018年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 10
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2017.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2017.html',
    breadcrumb: ['首页', '国产剧', '2017'],
    name: '2017年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 8
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2016.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2016.html',
    breadcrumb: ['首页', '国产剧', '2016'],
    name: '2016年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 7
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2015.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2015.html',
    breadcrumb: ['首页', '国产剧', '2015'],
    name: '2015年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 8
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2014.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2014.html',
    breadcrumb: ['首页', '国产剧', '2014'],
    name: '2014年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 7
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2013.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2013.html',
    breadcrumb: ['首页', '国产剧', '2013'],
    name: '2013年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 8
    }
  },
  {
    PaginationUrl: '/sh/12--------${0}---2012.html',
    key: '1001',
    id: '001',
    type: 'subdir',
    url: '/sh/12-----------2012.html',
    breadcrumb: ['首页', '国产剧', '2012'],
    name: '2012年系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    , Pagination: {
      page: 1,
      total: 7
    }
  }
]
