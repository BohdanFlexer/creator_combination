//` TODO: Global
/**
 * * створити список template, створити функціонал створення, додавання, зберігання, переміщення і змінення templates 
 * * добавити гайд(текстовий) в правому-верхньому куті або для кожного налаштування іконки-гайди
 * * Назначити або переписати архітектуру коду(переписати на ооп, модульна архітектура)
// * * Добавити прикріплене меню зверху у ній мають бути - настройки, скарги, контактні силки, тема, гайд
 * * Настройки - виключення ітерацій, змінна теми, включення автоматичних змін елементів при включенній опції "повтор елементів", відключення плавного переміщення елементів
 * * Переписати і оптимізувати все що звязане з repeat
 */

//` TODO: Local
/**
// // * * Зробити білу тему - done
 * * Зробити чорну тему
 * * Переписати всі розміра шрифтів на em or rem
 * * Add hide-unhide btn for lists(save, elems) or hide-unhide lists automatic
 * * Written guides
 * * Добавити можливість використання сайту через tab
 * * Оптимізувати css(максимально відмовитись від використання тегів як селекторів)
 * * Адаптувати скрол
 * * Переписати розміщення кнопок select-unselect
 * * Гайд анімашками(показовий)
 * * Choose and random в одному блоці
 * * Добавити накладення однакових елементів якщо вони йдуть в ряд (Скльопа x2)
 */

/// IDEAS
/**
 * / Зробити один блок в якому можна буде переключатись на random або choose
 * / Добавити під хедером дві кнопки random and  choose
 * / Запихнути сейви в хедер і відкривати його ще одним вікном, зберігати у самому списку елементів
 */

//` TODO: Additional
/**
 * * Добавити кнопку "dublicate", в елементи списку
 * * Добавити в data.json елементи статики і добавити опції з статикою
 * * Добавити коментрарі в код
 * * Добавити можливість вибору кількох елементів
 * * Можливість поставити свій фон - in reflections
 * * Плавний details
 * * Переписати систему перетягування елементів(добавити можливість перетягування тільки в лівий частині)  - in reflections
 * * CHOOSE: сортування - in reflections
 * * Добавити кнопки undo і redo:
 * * undo - відкатує список на одну дію назад
 * * redo - повертає список на одну дію вперед
 * * Своя клава для count
 * * Choose search: Виділенні елементи добавляти в основний пошук зразу, і з анімацією - в роздумах
 * * Зробити пасхалку з мінусовим значенням в settings count
 * * Пасхалка з введеням чогось в пошук
 * * Покращити анімацію відкриття для вікна choose
 * * Написати ще один інтерфейс
 */




// // * * Переписати додавання тем - done
// // * * Переписати css на scss - done
// // * * Підібрати шрифт чи шрифти - done
// // * * Баг: не коректно працює ліміт елементів в основному списку - done
// // * * Змінити систему відміни popup: створювати новий popup тільки коли старий вже видалився - done
// // * * * Options choose:
// // * * 1) зіскоки - done
// // * * 2) унікальні елементи - done
// // * * Choose search: добавити ліміт вибраних елементів, з урахування елементів у основному списку
// // * * Choose search: Виділенні елементи при пошуку не приховувати - done
// // * * Choose search: Добавити порядок нумерації виділеним елементам - done
// // * * Choose search: якщо в групі не знайдено ні одного елементу, тоді цю групу не показувати
// // * * Добавити адаптацію для вікна choose
// // * * * CHOOSE:
// // * * 1)пошук - done
// // * * 2)мультивибір - done
// // * * 3)згрупованність по типам елементів - done
// // * * Баг: обрізання контекстного меню - done(crutch)
// // * * Баг: не працює заміна на унікальний елемент при включенній опції "повтор елементів"
// // * * Баг: за умов максимальної кількості унікальних елементів і включенній опції "повтор елементів" при виконанні change all всі елементи заміняютсья на пусті
// // * * Переписати використання функції clearAndSave - done
// // * * Добавити контекстне меню елементам списку - done
// // * * Універсалізувати функції deleteAll - done
// // * * * SAVES:
// // * * 1)створення - done
// // * * 2)переключення - done
// // * * 3)зміна назви - done
// // * * 4)видалення - done
// // * * Добавити ліміт для сейвів, добавити надпис коли немає сейвів
// //  * * Розділити css на файли
// // * * Забрати автоматичне відхилення prompt
// // * * Забрати можливість любого переміщення останнього елементу якщо це зіскок - done
// // * * Виправити баг: коли включенні дві опції(перевірка, зміна зіскоку) при виборі елементів, вони потім заміняються на зіскок
// //  * * Забрати залежність опцій від увімкнення - Done
// // * * Пофіксити роботу перевірки наявності для замінни з опцією "Зіскок" - Done
// // * * Переписати prompt в deleteAllList() і changeAllList() на createPopup з інпутом  Done
// // * * замінити dateElems на json файл і брати елементи з файлу
// // * * Скачати fontAwesome і оптимізувати його під свої потреби - Done
// // * * Пофіксити некоректну роботу popup в changeAllList() - Done
// // * * Пофіксити збивання popup при багаторазовому визові - Done
// // * * Написати плавне переміщення елементів - Done
// // * * застилізувати настройки - Done
// // * * пофіксити скрол при виборі елементів на заміну - Done
// // * * перемалювати лого на темно оранжевий - Done
// // * * добавити кнопку "Select all" при активації опції "Повтор елементів" - Done
// // * * добавити перевірку наявності елементів для добавлення і замінни без повтору - Done
// // * * переписати checkRepetition() - Done
// // * * переписати createPopup - Done
// // * * запускати функції які потребую запускатись після iterate через new Promise().then() - Done