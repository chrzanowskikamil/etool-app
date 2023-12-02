export default async function RegisterPage() {
  return (
    <form>
      <label>
        Email:
        <input
          type='email'
          name='email'
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          name='password'
        />
      </label>
      <input
        type='submit'
        value='Submit'
      />
    </form>
  );
}
