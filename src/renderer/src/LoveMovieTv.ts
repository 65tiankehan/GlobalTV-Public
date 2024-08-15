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

export const LoveMovieTv: OptionSelects[] = [

  {
    PaginationUrl: 'sh/7--------${0}---2024.html',
    name: '2024系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2024.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2024'],
    Pagination: {
      page: 1,
      total: 2
    }

  },
  {
    PaginationUrl: 'sh/7--------${0}---2023.html',
    name: '2023系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2023.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2023'],
    Pagination: {
      page: 1,
      total: 2
    }

  },
  {
    PaginationUrl: 'sh/7--------${0}---2022.html',
    name: '2022系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2022.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2022'],
    Pagination: {
      page: 1,
      total: 2
    }

  },
  {
    PaginationUrl: 'sh/7--------${0}---2021.html',
    name: '2021系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2021.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2021'],
    Pagination: {
      page: 1,
      total: 2
    }

  },
  {
    PaginationUrl: 'sh/7--------${0}---2020.html',
    name: '2020系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2020.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2020'],
    Pagination: {
      page: 1,
      total: 3
    }

  },
  {
    PaginationUrl: 'sh/7--------${0}---2019.html',
    name: '2019系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2019.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2019'],
    Pagination: {
      page: 1,
      total: 3
    }

  },
  {
    PaginationUrl: 'sh/7--------${0}---2018.html',
    name: '2018系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2018.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2018'],
    Pagination: {
      page: 1,
      total: 3
    }

  },
  {
    PaginationUrl: 'sh/7--------${0}---2017.html',
    name: '2017系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2017.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2017'],
    Pagination: {
      page: 1,
      total: 3
    }

  },
  {
    PaginationUrl: 'sh/7--------${0}---2016.html',
    name: '2016系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2016.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2016'],
    Pagination: {
      page: 1,
      total: 2
    }

  },
  {
    PaginationUrl: 'sh/7--------${0}---2015.html',
    name: '2015系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2015.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2015'],
    Pagination: {
      page: 1,
      total: 2
    }

  },
  {
    PaginationUrl: 'sh/7--------${0}---2014.html',
    name: '2014系列',
    icon: '<svg t="1721806105199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7464" width="24" height="24"><path d="M509.7 929.1c-57.5 0-113.4-11.3-166-33.5-50.8-21.5-96.4-52.2-135.5-91.4s-69.9-84.7-91.4-135.5c-22.2-52.6-33.5-108.4-33.5-166s11.3-113.4 33.5-166c21.5-50.8 52.2-96.4 91.4-135.5 39.1-39.1 84.7-69.9 135.5-91.4 52.6-22.2 108.4-33.5 166-33.5 57.5 0 113.4 11.3 166 33.5 50.8 21.5 96.4 52.2 135.5 91.4 39.1 39.1 69.9 84.7 91.4 135.5 22.2 52.6 33.5 108.4 33.5 166s-11.3 113.4-33.5 166c-21.5 50.8-52.2 96.4-91.4 135.5s-84.7 69.9-135.5 91.4c-52.6 22.2-108.5 33.5-166 33.5z m0-807.5c-210.2 0-381.1 171-381.1 381.1s171 381.1 381.1 381.1 381.1-171 381.1-381.1-170.9-381.1-381.1-381.1z" fill="#444444" p-id="7465"></path><path d="M509.7 510.8m-248.7 0a248.7 248.7 0 1 0 497.4 0 248.7 248.7 0 1 0-497.4 0Z" fill="#FEE632" p-id="7466"></path><path d="M490.5 559.6c-12.4 0-22.6-10.2-22.6-22.6V323.8c0-12.4 10.2-22.6 22.6-22.6 12.4 0 22.6 10.2 22.6 22.6V537c0 12.4-10.2 22.6-22.6 22.6z" fill="#444444" p-id="7467"></path><path d="M644.2 671.4c-8.8 8.8-23.2 8.8-32 0L461.5 520.7c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l150.7 150.7c8.8 8.9 8.8 23.2 0 32z" fill="#444444" p-id="7468"></path></svg>'
    ,
    url: 'sh/7-----------2014.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '2014'],
    Pagination: {
      page: 1,
      total: 2
    }

  },
  {
    PaginationUrl: 'sh/7--hits------${0}---.html',
    name: '按人气',
    icon: '<svg t="1723614837861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="46109" width="24" height="24"><path d="M206.9 348.7c53.2-60.2 95.8-127.2 90.6-200.9-0.5-7.5-0.4-15-0.9-22.4-0.3-3.6 2.4-6.7 6.1-7 2.2-0.1 4.3-0.3 6.4-0.3 160.2 0 290.1 124 290.1 276.9 0 11.5-0.8 22.7-2.3 33.8-0.8 6.1 6.4 9.7 10.8 5.4 46.2-44.6 76.7-103.9 82.8-170.2 0.4-4.6 5.5-7.3 9.7-4.9 106.4 62.5 177.5 174.3 177.5 302.3 0 146.3-92.9 271.9-225.5 326-24 9.8-50.7 11.2-75.7 4-57.3-16.4-111.5-46.7-156.9-90.8-17-16.6-31.8-34.5-44.9-53.2-3-4.4-9.7-3.4-11.3 1.5-13.5 39.1-19.9 79.9-19.3 120.8 0.1 4.8-4.9 8-9.3 5.9-118.5-59.3-199.7-177.5-199.7-314.2 0-76.2 24.1-149.5 67-207.3" fill="#FFA500" p-id="46110"></path></svg>',
    url: 'sh/7--hits---------.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '人气排序'],
    Pagination: {
      page: 1,
      total: 32
    }

  },
  {
    PaginationUrl: 'sh/7--score------${0}---.html',
    name: '按评分',
    icon: '<svg t="1723614927773" class="icon" viewBox="0 0 1300 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="47171" width="24" height="24"><path d="M784.014714 99.204787l10.903312 18.428134-21.294732-2.559463-14.179425 16.124617-4.095141-21.089976-19.707865-8.497417 18.735269-10.442609 2.04757-21.345922 15.715103 14.58894 20.936408-4.658223-9.060499 19.451919zM1067.142514 642.37403l-18.428134 10.903312 2.559463-21.294732-16.073428-14.179425 21.038786-4.14633 8.497417-19.656676 10.442609 18.735269 21.345922 1.996381-14.588939 15.715103 4.658222 20.936408-19.451918-9.002031z" fill="#FD9A08" p-id="47172"></path><path d="M1067.142514 642.37403l-18.428134 10.903312 2.559463-21.294732-16.073428-14.179425 21.038786-4.14633 8.497417-19.656676 10.442609 18.735269 21.345922 1.996381-14.588939 15.715103 4.658222 20.936408-19.451918-9.002031zM571.886418 100.023815l-17.404348-12.541369 20.526893-6.1939 6.501036-20.424515 12.234233 17.609105 21.448301-0.153567-12.950883 17.097213 6.756982 20.373325-20.270947-7.012928-17.250781 12.694936 0.409514-21.4483zM991.382408 784.373039l-21.192354 3.480869 10.135474-18.888837-9.828338-19.093594 21.089975 3.78200020 15.1002032-15.254399 2.917788 21.243543 19.144783 9.623581-19.298351 9.367634-3.224923 21.192354-14.844886-15.459156zM427.993407 156.792705l-20.78284-5.323683 16.892456-13.258019-1.330921-21.397111 17.762674 11.927098 19.963811-7.883146-5.886765 20.629272 13.667533 16.534131-21.397111 0.819028-11.517584 18.069809-7.371253-20.117379zM854.19519 896.42633l-20.731651-5.323683 16.841267-13.258019-1.330921-21.397111 17.813863 11.978287 19.912622-7.934335-5.835575 20.629272 13.667532 16.534131-21.4483 0.819028-11.517584 18.069809-7.371253-20.117379zM562.416405 923.607827l10.903313 18.428134-21.294733-2.559463-14.179425 16.073428-4.14633-21.038786-19.656676-8.497418 18.735269-10.442609 1.996381-21.345921 15.715103 14.588939 20.936408-4.658223-9.002031 19.451919zM242.790663 420.724532l-18.479324 10.954502 2.559464-21.294733-16.073428-14.230614 21.038786-4.095141 8.497417-19.707865 10.442609 18.735269 21.345922 2.047571-14.588939 15.715103 4.709412 20.936407-19.451919-9.060499z" fill="#FD9A08" p-id="47173"></path><path d="M242.790663 420.724532l-18.479324 10.954502 2.559464-21.294733-16.073428-14.230614 21.038786-4.095141 8.497417-19.707865 10.442609 18.735269 21.345922 2.047571-14.588939 15.715103 4.709412 20.936407-19.451919-9.060499zM700.780976 943.878774l-17.404348-12.490179 20.475704-6.24509 6.552225-20.424515 12.234233 17.609106 21.448301-0.102379-12.950883 17.097213 6.756982 20.322136-20.270947-7.012928-17.30197 12.694936 0.460703-21.4483zM303.552315 278.827902l-21.192354 3.42968 10.135473-18.888837-9.828338-19.042405 21.089976 3.78200020 15.1002032-15.2544 2.917787 21.243543 19.144784 9.623581-19.298351 9.316445-3.224924 21.243544-14.844885-15.459157z" fill="#FD9A08" p-id="47174"></path><path d="M407.6200201 90.604991a486.861057 486.861057 0 0 1 504.521352 11.77353l25.031548-14.435371a511.892605 511.892605 0 0 0-797.528678 459.57718l25.031548-14.384182A486.758678 486.758678 0 0 1 407.6200201 90.604991zM893.201406 933.333787a486.861057 486.861057 0 0 1-504.521351-11.619963l-24.980359 14.384183A511.892605 511.892605 0 0 0 1161.177185 476.572015L1136.401583 490.956197a486.912246 486.912246 0 0 1-243.200177 442.37759z" fill="#FD9A08" p-id="47175"></path><path d="M813.909242 795.839433a326.587482 326.587482 0 0 1-258.147441 29.536203l-29.792149 17.199592a353.205897 353.205897 0 0 0 472.73282-272.429245l-29.792149 17.148403A326.843428 326.843428 0 0 1 813.909242 795.839433zM486.861057 228.099345a326.587482 326.587482 0 0 1 258.14744-29.536204l29.79215-17.199591A353.205897 353.205897 0 0 0 302.016637 453.792794l29.843339-17.148402a326.485103 326.485103 0 0 1 155.002081-208.545047zM1288.280119 374.705387a53.441588 53.441588 0 0 1-14.384182 11.978287l-1044.260914 601.934514a53.799913 53.799913 0 0 1-73.4054-19.759055L7.217686 710.660503a53.697534 53.697534 0 0 1 19.707865-73.405399L1071.442411 35.32059a53.799913 53.799913 0 0 1 73.4054 19.759054l148.80718 258.19863a53.953481 53.953481 0 0 1-5.374872 61.427113zM32.198045 665.716333a28.102904 28.102904 0 0 0-2.815409 32.146855l148.80718 258.19863a28.154093 28.154093 0 0 0 38.443134 10.237852L1261.149811 364.518724a28.154093 28.154093 0 0 0 10.237852-38.443135l-148.755991-258.249819a28.102904 28.102904 0 0 0-38.391945-10.237852L39.722866 659.4200204a27.130308 27.130308 0 0 0-7.524821 6.296279z" fill="#FD9A08" p-id="47176"></path><path d="M497.252476 603.111867L358.324823 683.427817l38.852649 67.262688c5.118926 9.316445 12.592558 11.312827 21.704247 6.040333l114.8687-66.546039a21.089975 21.089975 0 0 0 10.237852-11.159259q2.713031-9.930717-16.994834-47.606012l18.530512-4.14633c13.769911 28.973121 19.810244 47.810769 18.274566 56.308187a36.241996 36.241996 0 0 1-16.226996 19.503108l-123.87801 71.664965q-25.338684 14.640129-40.593083-11.82472L314.404438 644.984682l16.175806-9.316445 18.632891 32.3002023 122.854225-70.845936-33.784912-58.560514-150.957129 87.021742-9.111688-15.715102L445.346566 513.377093zM525.099434 543.066865l48.425041-28.0002026L630.907636 614.271126c3.583248-10.237852 7.064118-22.16495 10.544987-35.115833l14.332993 14.435372a360.423583 360.423583 0 0 1-22.011382 58.765271l-14.384182-10.493799a15.356778 15.356778 0 0 0-0.563082-12.848504l-51.649964-89.530017-33.017073 19.042405z m46.889363-69.566205l-4.504655 17.557916a274.579193 274.579193 0 0 0-58.662893-12.49018l4.86298-17.455537a293.007327 293.007327 0 0 1 58.304568 12.387801z m-2.713031-33.733723L691.055017 369.586461l8.804552 15.356778-53.185641 30.713556 48.834554 84.564659 59.942624-34.603941 8.906932 15.356779-59.891435 34.55275 46.070334 80.111193-15.715103 9.060499-46.070334-80.111192-59.123596 34.143236-8.958121-15.356778 59.021218-34.040858-48.885744-84.46228-52.724938 30.406421z m83.899198 64.037765l-11.824719 11.619962a424.870862 424.870862 0 0 0-50.063097-45.302496l11.312827-12.490179a509.384331 509.384331 0 0 1 50.574989 46.172713z m48.885744-100.330951A351.055948 351.055948 0 0 1 717.16154 470.941197l-16.431753 3.224923a325.922022 325.922022 0 0 0-14.998453-66.546039zM802.084523 308.927187a306.726049 306.726049 0 0 1-4.453466 64.242522 300.634527 300.634527 0 0 1-22.16495 64.242522l-16.892456-9.111688a189.912156 189.912156 0 0 0 21.089976-58.253379 264.597287 264.597287 0 0 0 4.299897-61.427112z m0 122.086386l-8.958121-15.356778 138.2110020-79.804057a680.40765 680.40765 0 0 1 34.65513 70.948315c7.473632 18.786459 10.237852 33.170641 8.395038 42.998979s-9.265256 18.888837-21.601867 26.823172l-38.852649 22.420897-13.0020072-13.104451c12.694937-6.705793 24.468467-13.258018 35.422968-19.554298 14.179425-8.190282 20.475704-18.837648 18.92000206-31.890909s-12.029476-37.982431-30.713556-73.917292l-61.427113 35.371779a198.204817 198.204817 0 0 1 11.722341 70.999504q-2.866599 32.453991-25.59463 70.948315l-17.250781-7.115307a160.375953 160.375953 0 0 0 24.26371-62.143762 155.154649 155.154649 0 0 0-8.958121-63.628251zM962.358097 309.643837l-3.532059 18.786458a204.757042 204.757042 0 0 1-121.318547-44.841792l9.521202-15.663914A178.292194 178.292194 0 0 0 962.358097 309.643837z" fill="#FD9A08" p-id="47177"></path></svg>',
    url: 'sh/7--score---------.html',
    type: 'subdir',
    id: '0020',
    key: '200020',
    breadcrumb: ['首页', '爱情片', '评分排序'],
    Pagination: {
      page: 1,
      total: 32
    }

  }
]
