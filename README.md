<h1 dir="rtl" align="right">🎬 Cinephiles</h1>

<p dir="rtl" align="right">
پروژه «Cinephiles» یک اپلیکیشن وب شخصی‌ساز برای عاشقان فیلم است که تجربه‌ای نوستالژیک و در عین حال مدرن از مدیریت کتابخانه فیلم‌های مورد علاقه شما ارائه می‌دهد. این برنامه با بهره‌گیری از API معتبر IMDB امکان جستجوی دقیق فیلم‌ها بر اساس عنوان و نمایش اطلاعات جامعی همچون سال انتشار، ژانر، خلاصه داستان، پوستر و کارگردان را فراهم می‌کند. کاربران می‌توانند فیلم‌های محبوب خود را در دسته‌بندی‌های شخصی ذخیره کرده، به هر فیلم امتیاز ستاره‌ای (۱ تا ۵) داده و نظرات خود را ثبت یا ویرایش نمایند. سیستم مدیریت دسته‌بندی‌ها امکان ایجاد، ویرایش و حذف لیست‌های دلخواه را داده و فیلم‌های هر دسته را بر اساس امتیاز داده شده توسط کاربر مرتب می‌سازد. تمامی داده‌های کاربر شامل لیست‌ها، امتیازها و نظرات به‌صورت امن در LocalStorage مرورگر ذخیره می‌شوند و با صفحه‌بندی روان، کاربران به‌راحتی میان صفحه اصلی، صفحه جزئیات فیلم و کتابخانه شخصی خود جابه‌جا می‌شوند. طراحی رابط کاربری با تم دارک و پالت رنگی گرم فضای سالن‌های سینمای کلاسیک را تداعی کرده و تجربه‌ای بصری، شهودی و بدون دغدغه را برای کاربران به ارمغان می‌آورد.
</p>

<h2 dir="rtl" align="right">معرفی</h2>

<p dir="rtl" align="right">
آزمایشگاه مهندسی نرم‌افزار<br>
دانشگاه صنعتی شریف
</p>

<p dir="rtl" align="right"><strong>گردآورندگان:</strong></p>

<ul dir="rtl" align="right">
<li>الینا هژبری – 401170661</li>
<li>ثمین اکبری – 401105594</li>
</ul>

<h2 dir="rtl" align="right">سوالات</h2>

<h3 dir="rtl" align="right">پرسش اول</h3>

<p dir="rtl" align="right"><strong>پوشه <code>.git</code> چیست؟</strong></p>

<p dir="rtl" align="right">
این پوشه قلب هر مخزن گیت است. تمامی اطلاعاتی که گیت برای ردیابی تاریخچه، شاخه‌ها و تنظیمات پروژه نیاز دارد، در همین پوشه نگه‌داری می‌شود. حذف این پوشه یعنی از دست رفتن کامل تاریخچه‌ی گیت پروژه.
</p>

<p dir="rtl" align="right"><strong>چه اطلاعاتی در آن ذخیره می‌شود؟</strong></p>

<p dir="rtl" align="right">در این پوشه اطلاعات زیادی ذخیره می‌شود که عبارتند از:</p>

<ul dir="rtl" align="right">
<li><code>HEAD</code>: یک اشاره‌گر به شاخه یا commit فعلی است</li>
<li><code>config</code>: پیکربندی و تنظیمات مخصوص همان مخزن را نگه می‌دارد.</li>
<li><code>objects/</code>: پایگاه داده گیت است و تمام objectهای گیت از جمله blob، tree، commit و tag به صورت هش‌شده در آن قرار دارد.</li>
<li><code>refs/</code>: مرجع شاخه‌ها (<code>heads/</code>) و تگ‌ها (<code>tags/</code>)</li>
<li><code>index</code>: فایل‌های ناحیه stage و پرونده‌های آماده commit را نگه می‌دارد.</li>
<li><code>logs/</code>: تاریخچه جابه‌جایی HEAD و شاخه‌ها را نگه می‌دارد.</li>
</ul>

<p dir="rtl" align="right"><strong>با چه دستوری ساخته می‌شود؟</strong></p>

<p dir="rtl" align="right">برای این کار از دو روش می‌توان استفاده کرد:</p>

<p dir="rtl" align="right">با دستور زیر یک دایرکتوری عادی را تبدیل به مخزن محلی git کنید:</p>

```bash
git init
```

<p dir="rtl" align="right">با استفاده از دستور <code>git clone</code> یک مخزن از راه دور را بگیرید:</p>

```bash
git clone https://github.com/saminakbari/Cinephiles.git
```

<h3 dir="rtl" align="right">پرسش دوم</h3>

<p dir="rtl" align="right"><strong>منظور از atomic بودن در atomic commit و atomic pull-request چیست؟</strong></p>

<ul dir="rtl" align="right">
<li><strong>atomic commit</strong>: یعنی هر commit باید یک و فقط یک تغییر منطقی مستقل را در برگیرد؛ به‌طوری‌که:
  <ul dir="rtl" align="right">
  <li>به‌تنهایی قابل فهم، بررسی و تست باشد.</li>
  <li>در صورت نیاز، بدون تأثیر روی بقیه‌ی تغییرات قابل revert باشد.</li>
  <li>ترکیبی از چند موضوع نامرتبط (مثلاً هم‌زمان رفع باگ + تغییر استایل + افزودن قابلیت) در آن وجود نداشته باشد.</li>
  </ul>
</li>
<li><strong>atomic pull-request</strong>: یعنی هر pull-request باید یک قابلیت یا تغییر منسجم را پوشش دهد تا بازبینی ساده‌تر، سریع‌تر و کم‌خطاتر شود.</li>
</ul>

<h3 dir="rtl" align="right">پرسش سوم</h3>

<p dir="rtl" align="right"><strong>تفاوت دستورهای fetch، pull، merge، rebase و cherry-pick را بیان کنید.</strong></p>

<p dir="rtl" align="right">این دستورات برای مدیریت و انتقال تغییرات بین شاخه‌ها و مخازن استفاده می‌شوند اما تفاوت‌هایی دارند.</p>

<table dir="rtl" align="right">
<tr><th>دستور</th><th>عملکرد</th></tr>
<tr><td><code>fetch</code></td><td>تغییرات جدید را از ریموت می‌گیرد اما هیچ ادغامی در شاخه‌ی فعلی انجام نمی‌دهد</td></tr>
<tr><td><code>merge</code></td><td>دو شاخه را ترکیب کرده و یک commit ادغام جدید (با دو والد) می‌سازد؛ تاریخچه‌ی هر دو شاخه حفظ می‌شود.</td></tr>
<tr><td><code>rebase</code></td><td>commitهای یک شاخه را برمی‌دارد و آن‌ها را روی نوک شاخه‌ی دیگر بازپخش می‌کند؛ تاریخچه، خطی و تمیز می‌شود ولی commitها بازنویسی شده و hash جدید می‌گیرند.</td></tr>
<tr><td><code>pull</code></td><td>معادل fetch + merge (یا rebase با فلگ <code>--rebase</code>) است؛ یعنی هم تغییرات را می‌گیرد و هم بلافاصله در شاخه‌ی فعلی ادغام می‌کند.</td></tr>
<tr><td><code>cherry-pick</code></td><td>فقط یک یا چند commit مشخص (نه کل شاخه) را از جایی دیگر روی شاخه‌ی فعلی اعمال می‌کند.</td></tr>
</table>

<h3 dir="rtl" align="right">پرسش چهارم</h3>

<p dir="rtl" align="right"><strong>تفاوت دستورهای reset، revert، restore، switch و checkout را بیان کنید.</strong></p>

<p dir="rtl" align="right">این دستورها برای مدیریت وضعیت فایل‌ها، commitها و branchها استفاده می‌شوند، اما کاربردهای متفاوت دارند.</p>

<table dir="rtl" align="right">
<tr><th>دستور</th><th>سطح</th><th>کاربرد</th></tr>
<tr><td><code>reset</code></td><td>commit / stage</td><td>برگرداندن شاخه به commit قبلی</td></tr>
<tr><td><code>revert</code></td><td>commit</td><td>لغو یک تغییر بدون پاک‌کردن تاریخچه</td></tr>
<tr><td><code>restore</code></td><td>file / working directory</td><td>برگرداندن یک فایل خاص به حالت قبلی، بدون دست‌زدن به کل تاریخچه</td></tr>
<tr><td><code>switch</code></td><td>branch</td><td>جابه‌جایی بین شاخه‌ها</td></tr>
<tr><td><code>checkout</code></td><td>file / branch / commit</td><td>دستور قدیمی‌تر و چندمنظوره که هم برای جابه‌جایی شاخه و هم بازگرداندن فایل استفاده می‌شد</td></tr>
</table>

<h3 dir="rtl" align="right">پرسش پنجم</h3>

<p dir="rtl" align="right"><strong>منظور از stage یا همان index چیست؟</strong></p>

<p dir="rtl" align="right">
stage یا index ناحیه میانی بین working directory و مخزن گیت است. فایل‌هایی که با دستور <code>git add</code> به این ناحیه اضافه می‌شوند، برای commit بعدی «آماده» تلقی می‌شوند. این ناحیه به شما اجازه می‌دهد فقط بخشی از تغییرات را در یک commit قرار دهید.
</p>

<p dir="rtl" align="right"><strong>دستور stash چه کاری را انجام می‌دهد؟</strong></p>

<p dir="rtl" align="right">
این دستور تغییرات ثبت‌نشده (چه در working directory و چه در stage) را به صورت موقت کنار می‌گذارد و working directory را به حالت آخرین commit برمی‌گرداند، بدون آنکه نیاز باشد آن‌ها را commit کرد. این تغییرات ثبت‌نشده در یک انبار ذخیره می‌شود و بعداً با دستور <code>git stash pop</code> یا <code>git stash apply</code> بازیابی می‌شوند.
</p>

<p dir="rtl" align="right">کاربرد رایج آن، جابه‌جایی سریع بین شاخه‌ها بدون از دست‌دادن تغییرات نیمه‌کاره است.</p>

<h3 dir="rtl" align="right">پرسش ششم</h3>

<p dir="rtl" align="right"><strong>مفهوم snapshot به چه معناست؟</strong></p>

<p dir="rtl" align="right">
عکس‌فوری (snapshot) یک تصویر کامل از وضعیت یک چیز در یک لحظه‌ی مشخص است. به عبارت دیگر نه فقط بخشی که تغییر کرده، بلکه کل آن چیز در آن لحظه را شامل می‌شود.
</p>

<p dir="rtl" align="right">
در گیت به جای آنکه بگوید چه خط‌هایی از فایل تغییر کرد (مبتنی بر diff)، در هر لحظه یک تصویر کامل از تمام فایل‌ها و پوشه‌های پروژه می‌گیرد.
</p>

<blockquote dir="rtl" align="right">
اگر فایلی بین دو commit تغییر نکرده باشد، گیت به جای کپی‌کردن دوباره، فقط یک اشاره‌گر به همان blob قبلی نگه می‌دارد. بنابراین با وجود اینکه هر commit تمام پروژه را نمایندگی می‌کند، از نظر فضای ذخیره‌سازی بسیار بهینه است.
<br><br>
این مبتنی بر snapshot بودن باعث می‌شود عملیاتی مانند merge و branch سریع‌تر و سبک‌تر باشند.
</blockquote>

<p dir="rtl" align="right"><strong>ارتباط آن با commit چیست؟</strong></p>

<p dir="rtl" align="right">هر commit در گیت دقیقاً یک snapshot است. وقتی دستور <code>git commit</code> زده می‌شود:</p>

<ul dir="rtl" align="right">
<li>گیت یک شیء tree می‌سازد که ساختار کامل فایل‌ها و پوشه‌های پروژه را در آن لحظه نشان می‌دهد.</li>
<li>برای هر فایلی که تغییر کرده است، یک شیء blob جدید می‌سازد؛ برای فایل‌های تغییرنکرده، از blob قبلی همان فایل استفاده می‌کند.</li>
<li>یک شیء commit می‌سازد که شامل اشاره‌گر به یک tree، commit والد و متادیتایی مانند نویسنده و پیام است.</li>
</ul>

<h3 dir="rtl" align="right">پرسش هفتم</h3>

<p dir="rtl" align="right"><strong>تفاوت‌های local repository و remote repository</strong></p>

<table dir="rtl" align="right">
<tr><th></th><th>Local repository</th><th>Remote repository</th></tr>
<tr><td>مکان</td><td>روی سیستم شخصی توسعه‌دهنده</td><td>روی سرور مانند GitHub یا GitLab</td></tr>
<tr><td>دسترسی</td><td>فقط توسط همان کاربر</td><td>به اشتراک‌گذاشته‌شده بین اعضای تیم</td></tr>
<tr><td>نیاز به اینترنت</td><td>خیر</td><td>بله (برای همگام‌سازی)</td></tr>
<tr><td>سرعت عملیات</td><td>سریع و لحظه‌ای</td><td>وابسته به شبکه</td></tr>
<tr><td>نقش</td><td>محیط کاری شخصی برای تغییر و آزمایش</td><td>نسخه مرجع/مشترک برای همکاری تیمی</td></tr>
<tr><td>ارتباط</td><td>اتصال به یک remote با دستور <code>git remote add</code></td><td>همگام‌سازی با git <code>push</code> / <code>pull</code> / <code>fetch</code></td></tr>
</table>

<h2 dir="rtl" align="right">نمونه پرامپت‌های هوش مصنوعی</h2>

<p dir="rtl" align="right">پرامپت‌هایی که استفاده کردیم شامل سه دسته می‌شوند:</p>

<p dir="rtl" align="right"><strong>پرامپت‌هایی که برای پروژه React زدیم؛ مانند:</strong></p>

<ul dir="rtl" align="right">
<li>این فایل نیازمندی‌ها و user storyهای پروژه React هست. ازت می‌خواهم صفحه به صفحه کمک کنی تا پروژه رو بزنیم. از صفحه اولیه شروع می‌کنیم. این صفحه شامل لگو و دکمه‌های sign up/log in و نوشته‌ای برای توضیح سایت است. مثل یه صفحه اولیه از سایت.</li>
<li>سپس صفحه login و sign-up را بزنیم. این صفحه شامل نکات زیر است:
  <ul dir="rtl" align="right">
  <li>کاربر باید بتواند با ایمیل، username و password ثبت نام کند و با username و password لاگین کند.</li>
  <li>پروژه فقط فرانت‌اند است اما باید بررسی شود که ایمیل و username تکراری نباشد و اخطار مناسب دهد.</li>
  <li>پسورد باید بررسی شود تا شامل حروف انگلیسی کوچک، بزرگ، عدد و نماد باشد و حداقل ۸ حرف باشد. در غیر این صورت خطاهای مناسب دهد.</li>
  <li>پسورد به صورت هش در local storage ذخیره شود. ایمیل و یوزرنیم نیز در local storage ذخیره شود.</li>
  <li>از صفحه Startpage با دکمه signup به صفحه sign up و با دکمه login به صفحه login می‌رویم. و پس از ثبت نام یا ورود وارد صفحه moviepage می‌شویم.</li>
  </ul>
</li>
<li>صفحه بعدی profile است. به این صورت که:
  <ul dir="rtl" align="right">
  <li>از صفحه MoviePage یک دایره با عکس profile طرف بزار که وقتی روش کلیک می‌کنه یک dropdown شخصی‌سازی شده بیاد که سه تا چیز نمایش بده: «Hi, username»، خط پایین «My account» و خط پایین «log out»</li>
  <li>تو صفحه my account باید یک sidebar داشته باشیم که شامل دو چیز بشه: صفحه edit profile و صفحه categories و حالت دیفالتش صفحه profile باشه که با یک دکمه که آیکون مداد داره بتونه edit انجام بده</li>
  <li>در edit profile فرد باید بتواند username، password و عکس profile خود را تغییر دهد. همچنین یک گزینه Delete account هم داشته باشیم که کلا اکانت رو پاک کنه، با تمام داده‌هاش</li>
  <li>صفحه categories رو فعلاً لازم نیست بزنی ولی تمام routerایناشو درست کن.</li>
  <li>یک دکمه back هم باید داشته باشیم که برگرده صفحه moviepage</li>
  </ul>
</li>
<li>صفحه moviepage:
  <ul dir="ltr" align="left">
  <li>i want to have a page that gets a list of movies from imdb site (or any site that is easily accessible. implement it using react and js and be entegrated with the existing code. these are the colors: background: 1A1A1A, theme is red: 8B0000 and gold: FDBC07. transparency: B8B8B8 and texts are: F5F5F0. implement it as simple as possible. do not commit anything. suggest a commit message</li>
  <li>now add search to this page so i can search the movies according to their names. do not use anything complicated just checking the titles of which movies have the searched string</li>
  <li>add filter, too. i want to filter according to genra and production year or imdb score. do not change other things just do this task and make as little changes as possible</li>
  <li>now i want a retrieve page for movies, too. when you click on a movie in the list, i want to see the details of that movie. do not change anything else unless you need for doing this task. suggest a commit message</li>
  </ul>
</li>
</ul>

<p dir="rtl" align="right"><strong>پرامپت‌هایی که برای سوالات پرسیده شده زدیم؛ مانند:</strong></p>

<p dir="rtl" align="right">به سوالات زیر جواب بده. لازم بود جدولی/نموداری چیزی هم بکش:</p>

<ul dir="rtl" align="right">
<li>پوشه‌ی <code>.git</code> چیست؟ چه اطلاعاتی در آن ذخیره می‌شود؟ با چه دستوری ساخته می‌شود؟</li>
<li>منظور از atomic بودن در atomic commit و atomic pull-request چیست؟</li>
<li>تفاوت دستورهای fetch و pull و merge و rebase و cherry-pick را بیان کنید.</li>
<li>تفاوت دستورهای reset و revert و restore و switch و checkout را بیان کنید.</li>
<li>منظور از stage یا همان index چیست؟ دستور stash چه کاری را انجام می‌دهد؟</li>
<li>مفهوم snapshot به چه معناست؟ ارتباط آن با commit چیست؟ (راهنمایی: <a href="https://github.blog/2020-12-17-commits-are-snapshots-not-diffs/">لینک</a>)</li>
<li>تفاوت‌های local repository و remote repository</li>
</ul>

<p dir="rtl" align="right"><strong>پرامپت‌هایی که برای دستورات گیت زدیم؛ مانند:</strong></p>

<ul dir="rtl" align="right">
<li>من باید حین پروژه‌ای که میزنم از این دستورا استفاده کنم. هر کدوم به چه درد می‌خوره و چه زمانی باید استفاده شه:
  <ul dir="rtl" align="right">
  <li>دستورات گیت: <code>git init</code>، <code>git config</code>، <code>git status</code>، <code>git branch</code>، <code>git add</code>، <code>git log</code>، <code>git commit</code>، <code>git diff</code>، <code>git pull</code>، <code>git reset</code>، <code>git push</code>، <code>git checkout</code></li>
  <li>دستورات stash: <code>save</code>، <code>show</code>، <code>list</code>، <code>apply</code>، <code>drop</code>، <code>pop</code></li>
  </ul>
</li>
<li>من یه سری تغییرات دادم تو یه برنچی. بعد push‌اش کردم با vscode مشکلی نبود. الان میرم تو گیت‌هاب میگه نمی‌تونه merge کنه. باید چه دستوری بزنم؟</li>
</ul>

<h2 dir="rtl" align="right">نمونه دستورات گیت</h2>

<p dir="rtl" align="right">دستورات زیر برای گیت زده شدند. عکس تمامی آن‌ها در پوشه git images قابل مشاهده است.</p>

```bash
git branch
git checkout
git pull origin main
git merge
git pull
git commit -m
git push --set-upstream origin
```
