CREATE TABLE public.user_groups (
  id character text NOT NULLCONSTRAINT user_groups_pkey PRIMARY KEY,
  name character text CONSTRAINT user_groups_name_key UNIQUE,
  permission character text,
);
ALTER TABLE ONLY public.user_groups
ADD CONSTRAINT "user_groups_userId_groupId_key" UNIQUE ("userId", "groupId");
ALTER TABLE ONLY public.user_groups
ADD CONSTRAINT "user_groups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.user_groups
ADD CONSTRAINT "user_groups_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
-- transactions:
begin transaction;
insert into users(id, login, password, age, isDeleted)
values('id4', 'login2', 'password', 22, false);
insert into groups(id, name, permission)
values('group1', 'READ group', 'READ', 22);
insert into user_groups(id, name, permission, userId, groupId)
values('ug1', 'READ UG', 'READ', 'id4', 'group1');
commit transaction;