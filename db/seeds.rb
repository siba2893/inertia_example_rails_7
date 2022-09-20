user = User.find_or_create_by!(
  first_name: 'Dev 1',
  email: 'dev1@test.com'
) do |user|
  user.password = 'password'
  user.password_confirmation = 'password'
end
