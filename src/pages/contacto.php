<?php

$resend = Resend::client('re_5BrHaozB_eCXBXHC8cXyCzXTLGqqY1PGH');

$resend->emails->send([
  'from' => 'onboarding@resend.dev',
  'to' => 'jpaulneo2k@gmail.com',
  'subject' => 'Hello World',
  'html' => '<p>Congrats on sending your <strong>first email</strong>!</p>'
]);