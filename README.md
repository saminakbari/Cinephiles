<div dir="rtl" align="right">

# 🎬 Cinephiles

پروژه «Cinephiles» یک اپلیکیشن وب شخصی‌ساز برای عاشقان فیلم است که تجربه‌ای نوستالژیک و در عین حال مدرن از مدیریت کتابخانه فیلم‌های مورد علاقه شما ارائه می‌دهد. این برنامه با بهره‌گیری از API معتبر IMDB امکان جستجوی دقیق فیلم‌ها بر اساس عنوان و نمایش اطلاعات جامعی همچون سال انتشار، ژانر، خلاصه داستان، پوستر و کارگردان را فراهم می‌کند. کاربران می‌توانند فیلم‌های محبوب خود را در دسته‌بندی‌های شخصی ذخیره کرده، به هر فیلم امتیاز ستاره‌ای (۱ تا ۵) داده و نظرات خود را ثبت یا ویرایش نمایند. سیستم مدیریت دسته‌بندی‌ها امکان ایجاد، ویرایش و حذف لیست‌های دلخواه را داده و فیلم‌های هر دسته را بر اساس امتیاز داده شده توسط کاربر مرتب می‌سازد. تمامی داده‌های کاربر شامل لیست‌ها، امتیازها و نظرات به‌صورت امن در LocalStorage مرورگر ذخیره می‌شوند و با صفحه‌بندی روان، کاربران به‌راحتی میان صفحه اصلی، صفحه جزئیات فیلم و کتابخانه شخصی خود جابه‌جا می‌شوند. طراحی رابط کاربری با تم دارک و پالت رنگی گرم فضای سالن‌های سینمای کلاسیک را تداعی کرده و تجربه‌ای بصری، شهودی و بدون دغدغه را برای کاربران به ارمغان می‌آورد.

**دمو زنده:** [saminakbari.github.io/Cinephiles](https://saminakbari.github.io/Cinephiles)

## معرفی

آزمایشگاه مهندسی نرم‌افزار
دانشگاه صنعتی شریف

**گردآورندگان:**

- الینا هژبری – 401170661
- ثمین اکبری – 401105594

## 🛠️ تکنولوژی‌ها
 
- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- ESLint
  
## ساختار پروژه
 
```
cinephiles/
├── public/                       # فایل‌های استاتیک عمومی
├── src/
│   ├── assets/                   # آیکون‌ها و تصاویر (logo.svg, camera.svg)
│   ├── components/                # کامپوننت‌های قابل استفاده مجدد
│   │   ├── AvatarMenu.jsx
│   │   ├── SaveToCategory.jsx
│   │   └── icons.jsx
│   ├── Pages/                     # صفحات اصلی برنامه
│   │   ├── account/                # صفحات مربوط به حساب کاربری
│   │   │   ├── CategoriesPage.jsx
│   │   │   ├── ProfileView.jsx
│   │   │   └── EditProfilePage.jsx
│   │   ├── StartPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── MoviesPage.jsx
│   │   ├── MovieDetail.jsx
│   │   └── MyAccountPage.jsx
│   ├── utils/                      # توابع کمکی (auth, categories, reviews)
│   ├── App.jsx                     # کامپوننت اصلی و روتینگ
│   ├── main.jsx                    # نقطه ورود برنامه (Entry point)
│   └── index.css
├── index.html
├── vite.config.js                  # تنظیمات Vite (base path برای GitHub Pages)
├── package.json
└── package-lock.json
```
 
پروژه‌ی اصلی داخل پوشه‌ی `cinephiles/` در روت ریپازیتوری قرار دارد.
 
## توسعه‌ی محلی
 
```bash
cd cinephiles
npm ci
npm run dev
```
 
بیلد پروداکشن:
 
```bash
npm run build
```

## استقرار روی github actions

این پروژه با یک ورک‌فلوی سفارشی (`.github/workflows/deploy.yml`) روی GitHub Pages دیپلوی می‌شود:
 
1. با هر `push` به شاخه‌ی `main` (یا اجرای دستی از طریق `workflow_dispatch`) ورک‌فلو استارت می‌شود.
2. کد چک‌اوت شده و Node.js نسخه‌ی ۲۲ با کش `npm` ست‌آپ می‌شود.
3. وابستگی‌ها با `npm ci` نصب و پروژه با `npm run build` بیلد می‌شود (خروجی در `cinephiles/dist/`).
4. برای پشتیبانی از مسیرهای SPA (React Router)، فایل `index.html` به‌عنوان `404.html` کپی می‌شود تا رفرش صفحات داخلی خطا ندهد، و فایل `.nojekyll` هم اضافه می‌شود تا GitHub Pages پردازش Jekyll را روی خروجی انجام ندهد.
5. خروجی بیلد به‌عنوان یک Pages artifact آپلود می‌شود (`actions/upload-pages-artifact`).
6. در یک job جدا (`deploy`)، همان artifact مستقیماً روی محیط `github-pages` منتشر می‌شود (`actions/deploy-pages`).
    
می‌توانید وضعیت اجرای هر بیلد را در تب [Actions](../../actions) مشاهده کنید.

## شاخه‌ها
پروژه به صورت branch-based توسعه یافته است؛ به این صورت که برای هر صفحه یک branch جداگانه در نظر گرفته شده است.
- شاخه main-page: صفحه اولیه سایت
-  شاخه movies-list: صفحه اصلی شامل فیلم‌ها، نوار جستجو و فیلترها
  - شاخه movies-detail: صفحه توضیحات فیلم، شامل نام، عکس، توضیحات، کارگردان و امتیاز فیلم
  - شاخه rate-and-review: بخش امتیازدهی و نظرات در صفحه توضیحات فیلم
  - شاخه categories-page: صفحه دسته‌بندی‌ها

شاخه main نیز توسط محدودیت‌ branch protection محافظت می‌شود و تنها از طریق pull request، تغییرات به آن منتقل می‌شود.

## استفاده از commitهای معنادار
در این پروژه سعی شده است commitها معنادار باشند یعنی در هر commit تغییر مشخص و معنادار صورت گرفته است.
به طور مثال:
- add authetication
- add start page
- add movie page
- add search
- add filter
- change some style in movie page
- add profile pages (edit, delete profile)
- add movie detail page
- add rate and review
- add categories page

## مشکلات merge conflicts
در این پروژه ما با دو تا merge conflict برخورد کردیم:
1. هنگام merge کردن main page با شاخه main یک سری تغییرات از سوی شاخه movie page بر روی app.jsx و index.css اعمال شدهد بود که با تغییرات شاخه main page در تضاد بود.
2. هنگام merge کردن movie list با شاخه main یک سری تغییرات روی app.jsx و moviepage.jsx اعمال شده بود که در تضاد با commitهای این شاخه بود. 

## سوالات

### پرسش اول

**پوشه `.git` چیست؟**

این پوشه قلب هر مخزن گیت است. تمامی اطلاعاتی که گیت برای ردیابی تاریخچه، شاخه‌ها و تنظیمات پروژه نیاز دارد، در همین پوشه نگه‌داری می‌شود. حذف این پوشه یعنی از دست رفتن کامل تاریخچه‌ی گیت پروژه.

**چه اطلاعاتی در آن ذخیره می‌شود؟**

در این پوشه اطلاعات زیادی ذخیره می‌شود که عبارتند از:

- ‏`HEAD`: یک اشاره‌گر به شاخه یا commit فعلی است
- ‏`config`: پیکربندی و تنظیمات مخصوص همان مخزن را نگه می‌دارد.
- ‏`objects/`: پایگاه داده گیت است و تمام objectهای گیت از جمله blob، tree، commit و tag به صورت هش‌شده در آن قرار دارد.
- ‏`refs/`: مرجع شاخه‌ها (`heads/`) و تگ‌ها (`tags/`)
- ‏`index`: فایل‌های ناحیه stage و پرونده‌های آماده commit را نگه می‌دارد.
- ‏`logs/`: تاریخچه جابه‌جایی HEAD و شاخه‌ها را نگه می‌دارد.

**با چه دستوری ساخته می‌شود؟**

برای این کار از دو روش می‌توان استفاده کرد:

با دستور زیر یک دایرکتوری عادی را تبدیل به مخزن محلی git کنید:

</div>

```bash
git init
```

<div dir="rtl" align="right">

با استفاده از دستور `git clone` یک مخزن از راه دور را بگیرید:

</div>

```bash
git clone https://github.com/saminakbari/Cinephiles.git
```

<div dir="rtl" align="right">

### پرسش دوم

**منظور از atomic بودن در atomic commit و atomic pull-request چیست؟**

- ‏**atomic commit**: یعنی هر commit باید یک و فقط یک تغییر منطقی مستقل را در برگیرد؛ به‌طوری‌که:
  - به‌تنهایی قابل فهم، بررسی و تست باشد.
  - در صورت نیاز، بدون تأثیر روی بقیه‌ی تغییرات قابل revert باشد.
  - ترکیبی از چند موضوع نامرتبط (مثلاً هم‌زمان رفع باگ + تغییر استایل + افزودن قابلیت) در آن وجود نداشته باشد.
- ‏**atomic pull-request**: یعنی هر pull-request باید یک قابلیت یا تغییر منسجم را پوشش دهد تا بازبینی ساده‌تر، سریع‌تر و کم‌خطاتر شود.

### پرسش سوم

**تفاوت دستورهای fetch، pull، merge، rebase و cherry-pick را بیان کنید.**

این دستورات برای مدیریت و انتقال تغییرات بین شاخه‌ها و مخازن استفاده می‌شوند اما تفاوت‌هایی دارند.

| دستور | عملکرد |
|---|---|
| `fetch` | تغییرات جدید را از ریموت می‌گیرد اما هیچ ادغامی در شاخه‌ی فعلی انجام نمی‌دهد |
| `merge` | دو شاخه را ترکیب کرده و یک commit ادغام جدید (با دو والد) می‌سازد؛ تاریخچه‌ی هر دو شاخه حفظ می‌شود. |
| `rebase` | commitهای یک شاخه را برمی‌دارد و آن‌ها را روی نوک شاخه‌ی دیگر بازپخش می‌کند؛ تاریخچه، خطی و تمیز می‌شود ولی commitها بازنویسی شده و hash جدید می‌گیرند. |
| `pull` | معادل fetch + merge (یا rebase با فلگ `--rebase`) است؛ یعنی هم تغییرات را می‌گیرد و هم بلافاصله در شاخه‌ی فعلی ادغام می‌کند. |
| `cherry-pick` | فقط یک یا چند commit مشخص (نه کل شاخه) را از جایی دیگر روی شاخه‌ی فعلی اعمال می‌کند. |

### پرسش چهارم

**تفاوت دستورهای reset، revert، restore، switch و checkout را بیان کنید.**

این دستورها برای مدیریت وضعیت فایل‌ها، commitها و branchها استفاده می‌شوند، اما کاربردهای متفاوت دارند.

| دستور | سطح | کاربرد |
|---|---|---|
| `reset` | commit / stage | برگرداندن شاخه به commit قبلی |
| `revert` | commit | لغو یک تغییر بدون پاک‌کردن تاریخچه |
| `restore` | file / working directory | برگرداندن یک فایل خاص به حالت قبلی، بدون دست‌زدن به کل تاریخچه |
| `switch` | branch | جابه‌جایی بین شاخه‌ها |
| `checkout` | file / branch / commit | دستور قدیمی‌تر و چندمنظوره که هم برای جابه‌جایی شاخه و هم بازگرداندن فایل استفاده می‌شد |

### پرسش پنجم

**منظور از stage یا همان index چیست؟**

‏stage یا index ناحیه میانی بین working directory و مخزن گیت است. فایل‌هایی که با دستور `git add` به این ناحیه اضافه می‌شوند، برای commit بعدی «آماده» تلقی می‌شوند. این ناحیه به شما اجازه می‌دهد فقط بخشی از تغییرات را در یک commit قرار دهید.

**دستور stash چه کاری را انجام می‌دهد؟**

این دستور تغییرات ثبت‌نشده (چه در working directory و چه در stage) را به صورت موقت کنار می‌گذارد و working directory را به حالت آخرین commit برمی‌گرداند، بدون آنکه نیاز باشد آن‌ها را commit کرد. این تغییرات ثبت‌نشده در یک انبار ذخیره می‌شود و بعداً با دستور `git stash pop` یا `git stash apply` بازیابی می‌شوند.

کاربرد رایج آن، جابه‌جایی سریع بین شاخه‌ها بدون از دست‌دادن تغییرات نیمه‌کاره است.

### پرسش ششم

**مفهوم snapshot به چه معناست؟**

عکس‌فوری (snapshot) یک تصویر کامل از وضعیت یک چیز در یک لحظه‌ی مشخص است. به عبارت دیگر نه فقط بخشی که تغییر کرده، بلکه کل آن چیز در آن لحظه را شامل می‌شود.

در گیت به جای آنکه بگوید چه خط‌هایی از فایل تغییر کرد (مبتنی بر diff)، در هر لحظه یک تصویر کامل از تمام فایل‌ها و پوشه‌های پروژه می‌گیرد.

> اگر فایلی بین دو commit تغییر نکرده باشد، گیت به جای کپی‌کردن دوباره، فقط یک اشاره‌گر به همان blob قبلی نگه می‌دارد. بنابراین با وجود اینکه هر commit تمام پروژه را نمایندگی می‌کند، از نظر فضای ذخیره‌سازی بسیار بهینه است.
>
> این مبتنی بر snapshot بودن باعث می‌شود عملیاتی مانند merge و branch سریع‌تر و سبک‌تر باشند.

**ارتباط آن با commit چیست؟**

هر commit در گیت دقیقاً یک snapshot است. وقتی دستور `git commit` زده می‌شود:

- گیت یک شیء tree می‌سازد که ساختار کامل فایل‌ها و پوشه‌های پروژه را در آن لحظه نشان می‌دهد.
- برای هر فایلی که تغییر کرده است، یک شیء blob جدید می‌سازد؛ برای فایل‌های تغییرنکرده، از blob قبلی همان فایل استفاده می‌کند.
- یک شیء commit می‌سازد که شامل اشاره‌گر به یک tree، commit والد و متادیتایی مانند نویسنده و پیام است.

### پرسش هفتم

**تفاوت‌های local repository و remote repository**

| | Local repository | Remote repository |
|---|---|---|
| مکان | روی سیستم شخصی توسعه‌دهنده | روی سرور مانند GitHub یا GitLab |
| دسترسی | فقط توسط همان کاربر | به اشتراک‌گذاشته‌شده بین اعضای تیم |
| نیاز به اینترنت | خیر | بله (برای همگام‌سازی) |
| سرعت عملیات | سریع و لحظه‌ای | وابسته به شبکه |
| نقش | محیط کاری شخصی برای تغییر و آزمایش | نسخه مرجع/مشترک برای همکاری تیمی |
| ارتباط | اتصال به یک remote با دستور `git remote add` | همگام‌سازی با git `push` / `pull` / `fetch` |

## نمونه پرامپت‌های هوش مصنوعی

پرامپت‌هایی که استفاده کردیم شامل سه دسته می‌شوند:

**پرامپت‌هایی که برای پروژه React زدیم؛ مانند:**

- این فایل نیازمندی‌ها و user storyهای پروژه React هست. ازت می‌خواهم صفحه به صفحه کمک کنی تا پروژه رو بزنیم. از صفحه اولیه شروع می‌کنیم. این صفحه شامل لگو و دکمه‌های sign up/log in و نوشته‌ای برای توضیح سایت است. مثل یه صفحه اولیه از سایت.
- سپس صفحه login و sign-up را بزنیم. این صفحه شامل نکات زیر است:
  - کاربر باید بتواند با ایمیل، username و password ثبت نام کند و با username و password لاگین کند.
  - پروژه فقط فرانت‌اند است اما باید بررسی شود که ایمیل و username تکراری نباشد و اخطار مناسب دهد.
  - پسورد باید بررسی شود تا شامل حروف انگلیسی کوچک، بزرگ، عدد و نماد باشد و حداقل ۸ حرف باشد. در غیر این صورت خطاهای مناسب دهد.
  - پسورد به صورت هش در local storage ذخیره شود. ایمیل و یوزرنیم نیز در local storage ذخیره شود.
  - از صفحه Startpage با دکمه signup به صفحه sign up و با دکمه login به صفحه login می‌رویم. و پس از ثبت نام یا ورود وارد صفحه moviepage می‌شویم.
- صفحه بعدی profile است. به این صورت که:
  - از صفحه MoviePage یک دایره با عکس profile طرف بزار که وقتی روش کلیک می‌کنه یک dropdown شخصی‌سازی شده بیاد که سه تا چیز نمایش بده: «Hi, username»، خط پایین «My account» و خط پایین «log out»
  - تو صفحه my account باید یک sidebar داشته باشیم که شامل دو چیز بشه: صفحه edit profile و صفحه categories و حالت دیفالتش صفحه profile باشه که با یک دکمه که آیکون مداد داره بتونه edit انجام بده
  - در edit profile فرد باید بتواند username، password و عکس profile خود را تغییر دهد. همچنین یک گزینه Delete account هم داشته باشیم که کلا اکانت رو پاک کنه، با تمام داده‌هاش
  - صفحه categories رو فعلاً لازم نیست بزنی ولی تمام routerایناشو درست کن.
  - یک دکمه back هم باید داشته باشیم که برگرده صفحه moviepage
- صفحه moviepage:

</div>

<div dir="ltr" align="left">

- i want to have a page that gets a list of movies from imdb site (or any site that is easily accessible. implement it using react and js and be entegrated with the existing code. these are the colors: background: 1A1A1A, theme is red: 8B0000 and gold: FDBC07. transparency: B8B8B8 and texts are: F5F5F0. implement it as simple as possible. do not commit anything. suggest a commit message
- now add search to this page so i can search the movies according to their names. do not use anything complicated just checking the titles of which movies have the searched string
- add filter, too. i want to filter according to genra and production year or imdb score. do not change other things just do this task and make as little changes as possible
- now i want a retrieve page for movies, too. when you click on a movie in the list, i want to see the details of that movie. do not change anything else unless you need for doing this task. suggest a commit message

</div>

<div dir="rtl" align="right">

**پرامپت‌هایی که برای سوالات پرسیده شده زدیم؛ مانند:**

به سوالات زیر جواب بده. لازم بود جدولی/نموداری چیزی هم بکش:

- پوشه‌ی `.git` چیست؟ چه اطلاعاتی در آن ذخیره می‌شود؟ با چه دستوری ساخته می‌شود؟
- منظور از atomic بودن در atomic commit و atomic pull-request چیست؟
- تفاوت دستورهای fetch و pull و merge و rebase و cherry-pick را بیان کنید.
- تفاوت دستورهای reset و revert و restore و switch و checkout را بیان کنید.
- منظور از stage یا همان index چیست؟ دستور stash چه کاری را انجام می‌دهد؟
- مفهوم snapshot به چه معناست؟ ارتباط آن با commit چیست؟ (راهنمایی: [لینک](https://github.blog/2020-12-17-commits-are-snapshots-not-diffs/))
- تفاوت‌های local repository و remote repository

**پرامپت‌هایی که برای دستورات گیت زدیم؛ مانند:**

- من باید حین پروژه‌ای که میزنم از این دستورا استفاده کنم. هر کدوم به چه درد می‌خوره و چه زمانی باید استفاده شه:
  - دستورات گیت: `git init`، `git config`، `git status`، `git branch`، `git add`، `git log`، `git commit`، `git diff`، `git pull`، `git reset`، `git push`، `git checkout`
  - دستورات stash: `save`، `show`، `list`، `apply`، `drop`، `pop`
- من یه سری تغییرات دادم تو یه برنچی. بعد push‌اش کردم با vscode مشکلی نبود. الان میرم تو گیت‌هاب میگه نمی‌تونه merge کنه. باید چه دستوری بزنم؟
- من الان یه سری تغییرات دادم اما حواسم نبود رو برنچ main بودم. تغییرات رو هنوز add و commit نکردم. چجوری میتونم این تغییرات رو ببرم تو یه برنچ دیگه و اونجا Add و commit کنم؟

**پرامپت‌هایی که برای github action زدیم؛ مانند:**

- now i want to deploy this project on github using github actions. i want it to deploy new changes whenever a new commit is pushed to main branch. implement anything needed and tell me exactly what to do.
- موقع deploy با این خطا مواجه می‌شویم. مشکل چیست و چگونه آن را حل کنم؟
Run peaceiris/actions-gh-pages@v4
[INFO] Usage https://github.com/peaceiris/actions-gh-pages#readme
Dump inputs
Setup auth token
[INFO] setup GITHUB_TOKEN
Error: Action failed with "You deploy from main to main
This operation is prohibited to protect your contents
"

## نمونه دستورات گیت

دستورات زیر برای گیت زده شدند. عکس تمامی آن‌ها در پوشه git images قابل مشاهده است.

</div>

```bash
git branch
git checkout
git checkout -b
git pull origin main
git merge
git pull
git commit -m
git push --set-upstream origin
git stash push -m
git stash list
git stash pop
```
